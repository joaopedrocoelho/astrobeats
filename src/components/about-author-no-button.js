import React from "react"

import ReactMarkdown from "react-markdown"

import "./styles/about-author.css"

const AboutMe = ({ author, avatar, header, text }) => {
  return (
    <div className="about-author-container" key={author} id="author">
      <img
        className="about-author-avatar"
        src={avatar}
        alt="author photo"
      ></img>
      <h2 className="about-header">{header}</h2>
      <div className={`about-author-text visible`}>
        <ReactMarkdown source={text} />
      </div>
    </div>
  )
}

export default AboutMe
