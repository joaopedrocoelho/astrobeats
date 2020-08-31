import React, { useState } from "react"
import Layout from "./layout"
import { Link } from "gatsby"

import ReactMarkdown from "react-markdown"

import PlusButton from "./plus_button"

import "./styles/about-author.css"

const AboutMe = ({ author, avatar, header, text }) => {
  const [clicked, showText] = useState(false)

  return (
    <div className="about-author-container" key={author}>
      <img className="about-author-avatar" src={avatar}></img>
      <h2 className="about-header">{header}</h2>
      <button
        className="more-button"
        onClick={() => showText(clicked === true ? false : true)}
      >
        <PlusButton rotate={clicked} />
      </button>
      <div className={`about-author-text${clicked ? " visible" : ""}`}>
        <ReactMarkdown source={text} />
      </div>
    </div>
  )
}

export default AboutMe
