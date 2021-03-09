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
        height: "2vw",
        ["@media (max-width:600px)"]: {
          height: "7vw",
        },
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

const regex = /([A-Z])\w+/g

const ClientDataForm = ({ submitfunc, submit }) => {
  const [userEmail, setEmail] = useState("")
  const [userName, setName] = useState("")
  const [birthday, setBirthday] = useState(dayjs("1990-01-01"))
  const [birthtime, setBirthtime] = useState(dayjs())
  const [unknownTime, setUnknownTime] = useState(false)
  const [city, setCity] = useState()
  const { register, handleSubmit, watch, errors, control } = useForm()

  const [error, setError] = useState()

  /* para mandar para Strapi */

  const onSubmit = async event => {
    /* event.preventDefault() */

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
          nome: userName,
          aniversario: birthday.format("YYYY-MM-DD HH:mm").toString(),
          semhora: unknownTime,
          cidadeNatal: city.suggestion.value,
        }),
      }
    )
      .catch(error => setError(error))
      .then(submitfunc(true))

    const data = await response.json()
  }
  return (
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
        <MuiPickersUtilsProvider utils={DayJsUtils}>
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
        </MuiPickersUtilsProvider>
      </span>
      <span className="section">
        <label className="input-label" for="birthtime">
          Time of birth
        </label>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
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
        </MuiPickersUtilsProvider>
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

      {error ? <p>error</p> : ""}
      <button type="submit" className="abt-btn submit-btn">
        Submit
      </button>
    </form>
  )
}

export default ClientDataForm
