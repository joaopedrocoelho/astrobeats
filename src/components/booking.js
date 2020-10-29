import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import AlgoliaPlaces from "algolia-places-react"

import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import DayJsUtils from "@date-io/dayjs"

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import CustomParseFormat from "dayjs/plugin/CustomParseFormat"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(CustomParseFormat)
dayjs.extend(isBetween)
console.log("timezone", dayjs.tz.guess())

/* Date.prototype.toJSON = function () {
  return dayjs(this).format()
} */

const datePickerCSS = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#512357",
      },
    },
    MuiInputBase: {
      root: {
        color: "var(--light-text-color)",
      },
      input: {
        color: "var(--light-text-color)",
        fontSize: "0.8em",
        border: "1px solid #ccc",
        borderRadius: "3px",
        paddingLeft: "16px",
        height: "1.8vw",
      },
    },
    MuiInput: {
      input: {
        color: "var(--light-text-color)",
      },
      underline: {
        "&before": {
          borderRadius: "3px",
        },
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#512357",
      },
      daySelected: {
        backgroundColor: "#df5ee8",
      },
      dayDisabled: {
        color: "#a4c7c9",
      },
      current: {
        color: "#d193ff",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#ffde4c",
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#843b8c",
      },
    },
  },
})

// essa seriam as minhas horas disponiveis no meu horario local
// as datas eh soh pra poder usar o convertor do dayjs
const availableHours = [
  /* Monday */

  "2020-09-21 10:30",

  /* Tuesday */

  "2020-09-22 08:00",
  "2020-09-22 09:00",
  "2020-09-22 11:00",
  "2020-09-22 12:00",
  "2020-09-22 13:00",
  "2020-09-22 14:00",
  "2020-09-22 15:00",
  "2020-09-22 16:00",
  "2020-09-22 17:00",
  "2020-09-22 18:00",
  "2020-09-22 19:00",
  "2020-09-22 20:00",
  /* Wednesday */

  "2020-09-23 10:30",
  "2020-09-23 11:30",
  /* Thursday */

  "2020-09-24 08:00",
  "2020-09-24 09:00",
  "2020-09-24 11:00",
  /* Friday */

  "2020-09-25 10:30",
  "2020-09-25 11:30",

  /* Saturday */

  "2020-09-26 13:00",
  "2020-09-26 14:00",
  "2020-09-26 15:00",
  "2020-09-26 16:00",
  "2020-09-26 17:00",
  "2020-09-26 18:00",
  "2020-09-26 19:00",
  "2020-09-26 20:00",
  /* Sunday */

  "2020-09-27 13:00",
  "2020-09-27 14:00",
  "2020-09-27 15:00",
  "2020-09-27 16:00",
  "2020-09-27 17:00",
  "2020-09-27 18:00",
  "2020-09-27 19:00",
  "2020-09-27 20:00",
]
console.log("availableHours", availableHours)

//array com os dias e as horas no meu horario
const availableHoursLocal = availableHours.map(i =>
  dayjs.tz(i, "Asia/Taipei").format("dddd HH:mm")
)

console.log("availableHoursLocal", availableHoursLocal)

//array com os dias e as horas no horario do usuario
const availableHoursUser = availableHours.map(i =>
  dayjs.tz(i, "Asia/Taipei").local().format("dddd HH:mm")
)

console.log("availableHoursUser", availableHoursUser)

const regex = /([A-Z])\w+/g

const Booking = () => {
  const [bookingDate, setBookingDate] = useState(dayjs().add(7, "day"))

  //mandar as horas para o strapi
  const [bookingMyTime, setbookingMyTime] = useState()

  //form data
  const [userEmail, setEmail] = useState("")
  const [userName, setName] = useState("")
  const [birthday, setBirthday] = useState(dayjs("1990-01-01"))
  const [birthtime, setBirthtime] = useState(dayjs().local())
  const [unknownTime, setUnknownTime] = useState(false)
  const [city, setCity] = useState()
  const { register, handleSubmit, watch, errors, control } = useForm()
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState()

  //arrays com os horarios que se pode bookar  com base na data selecionada pelo usuario
  let possibleHoursLocal = []
  let possibleHoursUser = []

  //pra renderizar os horarios
  const [bookableHours, setbookableHours] = useState([])

  useEffect(() => {
    //essas var pegam o intervalo de horas do dia selecionado pelo usuario e convertem pro meu fuso horario
    const bookingDayStart = dayjs(bookingDate).startOf("day").tz("Asia/Taipei")
    const bookingDayEnd = dayjs(bookingDate).endOf("day").tz("Asia/Taipei")
    //a primeira hora e a ultima hora do dia convertido para o meu fuso horario
    const startDayMinHour = `${bookingDayStart.hour()}:${bookingDayStart.minute()}`
    const endDayMaxHour = `${bookingDayEnd.hour()}:${bookingDayEnd.minute()}`

    //pega e seleciona todos os horarios possiveis
    let startDayArr = [] //array com os horarios do startDay
    let endDayArr = [] //array com os horarios do endDay
    availableHours.forEach(hour => {
      let day = dayjs(hour).format("dddd")
      let time = dayjs(hour).format("HH:mm")
      if (day == bookingDayStart.format("dddd")) {
        if (dayjs(time, "HH:mm") > dayjs(startDayMinHour, "HH:mm")) {
          startDayArr.push(dayjs(hour).format("dddd HH:mm"))
        }
      } else if (day == bookingDayEnd.format("dddd")) {
        if (dayjs(time, "HH:mm") < dayjs(endDayMaxHour, "HH:mm")) {
          endDayArr.push(dayjs(hour).format("dddd HH:mm"))
        }
      }
      possibleHoursLocal = startDayArr.concat(endDayArr) //junta os dois horarios num so
    })

    //cria os horarios disponiveis no fuso horario do usuario comparando
    //onde se encontram os horarios no availableHoursLocal
    for (let index = 0; index < availableHoursLocal.length; index++) {
      if (
        availableHoursLocal.findIndex(
          element => element === possibleHoursLocal[index]
        ) !== -1
      )
        possibleHoursUser.push(
          availableHoursUser[
            availableHoursLocal.findIndex(
              element => element === possibleHoursLocal[index]
            )
          ]
        )
    }

    setbookableHours(possibleHoursUser)
    /* console.log("possibleHoursLocal", possibleHoursLocal)
    console.log("possibleHoursUser", possibleHoursUser)
    console.log("bookableHours", bookableHours) */
    console.log("bookingDate com hora", bookingDate)

    console.log(
      "bookingDate com hora Taiwan",
      bookingDate.tz("Asia/Taipei").toJSON()
    )
    // return () => {}
  }, [bookingDate])

  //add hour and minutes to birthday
  useEffect(() => {
    const birthHour = dayjs(birthtime).format("HH")
    const birthMin = dayjs(birthtime).format("mm")

    setBirthday(birthday.hour(birthHour).minute(birthMin))
  }, [birthtime])

  //add hour and minutes to bookingtime
  useEffect(() => {
    if (bookingMyTime) {
      const selectHour = bookingMyTime
        .replace(/([A-Z])\w+/g, "")
        .replace(/[(?<=:)]\d+/, "")
      const selectMin = bookingMyTime
        .replace(/([A-Z])\w+/g, "")
        .replace(/[^(?<=:).*]+:/, "")
      setBookingDate(bookingDate.hour(selectHour).minute(selectMin))
    }
  }, [bookingMyTime])

  /* para mandar para Strapi */

  const onSubmit = async event => {
    /* event.preventDefault() */
    console.log("Errors", errors.userName)
    //transform date
    var replacer = function (key, value) {
      if (this[key] instanceof Date) {
        return this[key].toUTCString()
      }

      return value
    }

    const response = await fetch(
      "https://astrobeats-cms.herokuapp.com/appointments",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          contato: userEmail,
          horario: bookingDate
            .tz("Asia/Taipei")
            .format("YYYY-MM-DD HH:mm")
            .toString(),
          horarioUsuario: bookingDate.format("YYYY-MM-DD HH:mm").toString(),
          nome: userName,
          aniversario: birthday.format("YYYY-MM-DD HH:mm").toString(),
          semhora: unknownTime,
          cidadeNatal: city.suggestion.value,
        }),
      }
    )
      .then(setSubmit(true))
      .catch(error => setError(error))

    const data = await response.json()
    console.log("booking", data)
  }

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <h3>Book your consultation</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="user-data">
        <span className="section">
          <label className="input-label" for="userName">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            value={userName}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            name="userName"
            id="userName"
            ref={register({
              required: true,
              minLength: {
                value: 1,
                message: "Please enter your name",
              },
            })}
          />
          {errors.userName && (
            <p className="form-error">Please enter your name</p>
          )}
        </span>
        <span className="section">
          <label className="input-label" for="e-mail">
            E-mail:
          </label>
          <input
            className="form-input"
            type="email"
            name="eMail"
            id="e-mail"
            value={userEmail}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            id="userEmail"
            ref={register({
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
          />
          {errors.eMail && (
            <p className="form-error">Please enter a valid e-mail address.</p>
          )}
        </span>
        <span className="section">
          <label className="input-label" for="birthday">
            Birthday
          </label>
          <ThemeProvider theme={datePickerCSS}>
            <DatePicker
              id="birthday-picker"
              value={birthday}
              onChange={setBirthday}
              format="MMMM DD YYYY"
              inputRef={register}
              name="birthday"
            />
          </ThemeProvider>
        </span>
        <span className="section">
          <label className="input-label" for="birthtime">
            Time of birth
          </label>
          <ThemeProvider theme={datePickerCSS}>
            <TimePicker
              id="birthtime-picker"
              value={birthtime}
              disabled={unknownTime}
              onChange={newTime => {
                setBirthtime(newTime)
              }}
              classes={{
                disabled: "unknown-time",
              }}
              name="birthtime"
              ref={register}
            />
          </ThemeProvider>
          <label className="input-label unknown-time">
            <input
              type="checkbox"
              name="unknown-time"
              id="unknown-time"
              ref={register({
                required: false,
              })}
              onClick={() => setUnknownTime(!unknownTime)}
            />
            Unknown birth time?
          </label>
        </span>
        <span className="full-width section">
          <label className="input-label" for="city-of-birth">
            City of birth
          </label>
          <Controller
            control={control}
            placeholder="Type your city of birth"
            render={({ onChange }) => (
              <AlgoliaPlaces onChange={e => setCity(e)} />
            )}
            name="hometown"
            ref={register({
              required: true,
            })}
          />
          {city ? (
            ""
          ) : (
            <p className="form-error">Please choose your place of birth.</p>
          )}
        </span>

        <span className="section">
          <label className="input-label" for="consultation">
            Consultation date:
          </label>
          <ThemeProvider theme={datePickerCSS}>
            <DatePicker
              id="consultation"
              value={bookingDate}
              onChange={setBookingDate}
              disablePast
              minDate={dayjs().add(7, "day")}
              minDateMessage={
                "Consultations should be booked one week in advance"
              }
              ref={register}
              required
            />
          </ThemeProvider>
        </span>
        <span className="section">
          <time
            className="time"
            datetime={dayjs(bookingDate).format("YYYY-MM-DD")}
          >
            {dayjs(bookingDate).format("dddd MMM DD, YYYY")}
            {bookingMyTime ? bookingMyTime.replace(regex, "") : ""}
          </time>
        </span>
        <span className="section">
          <label className="input-label" for="consultation">
            Available time:
          </label>
        </span>
        <div className="availableHours">
          {bookableHours.map((time, index) => {
            return (
              <>
                <input
                  type="radio"
                  name="radio"
                  id={index}
                  onClick={() => {
                    setbookingMyTime(time)
                  }}
                />
                <label
                  className={`hour-btn`}
                  for={index}
                  title={dayjs(bookingDate).format("YYYY-MM-DD")}
                >
                  {time}
                </label>
              </>
            )
          })}
        </div>

        {error ? <p>error</p> : ""}
        {submit ? (
          <p className="submit-message">
            Your form was submitted and I'll reach out to you soon
          </p>
        ) : (
          <button type="submit" className="abt-btn submit-btn">
            Submit
          </button>
        )}
      </form>
    </MuiPickersUtilsProvider>
  )
}

export default Booking
