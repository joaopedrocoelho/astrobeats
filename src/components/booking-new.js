import React, { useState, useRef } from "react"
import ClientDataForm from "./booking/clientdataform"
import { InlineWidget, CalendlyEventListener } from "react-calendly"

import "./styles/booking.css"

const BookingNew = () => {
  const [submit, setSubmit] = useState(false)
  const [step, setStep] = useState(1)
  const myRef = useRef(null)

  const executeScroll = () => myRef.current.scrollIntoView()

  function renderStep(param) {
    switch (param) {
      case 1:
        return (
          <ClientDataForm
            submitfunc={value => {
              setSubmit(value)
              setStep(2)
            }}
            submit={submit}
          />
        )
      case 2:
        return (
          <InlineWidget
            url="https://calendly.com/peregrinastro"
            styles={{
              height: "100vh",
            }}
          />
        )
      case 3:
        return (
          <div className="pay-button" ref={myRef}>
            <button className="abt-btn submit-btn">
              <a href="https://www.paypal.com/paypalme/peregrinastro">
                Pay by paypal
              </a>
            </button>
          </div>
        )
    }
  }

  return (
    <>
      <h3>Book your consultation</h3>
      <CalendlyEventListener
        /*  onEventTypeViewed={e => {
          setStep(3)
          executeScroll()
        }} */
        onEventScheduled={e => {
          setStep(3)
          executeScroll()
        }}
      />
      <ol className="booking-nav">
        <li className={step === 1 ? "active" : ""}>Fill in your birth data</li>
        <li className={step === 2 ? "active" : ""}>
          Schedule your appointment
        </li>
        <li className={step === 3 ? "active" : ""}>
          Pay for your consultation
        </li>
      </ol>

      {renderStep(step)}
    </>
  )
}

export default BookingNew
