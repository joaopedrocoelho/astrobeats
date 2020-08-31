import React from "react"
import { Link } from "gatsby"
import Layout from "./layout"
import QuickAccessBar from "./sign-quick-access-bar"

import AriesIcon from "../../assets/sign-illustration/aries.svg"
import TaurusIcon from "../../assets/sign-illustration/taurus.svg"
import GeminiIcon from "../../assets/sign-illustration/gemini.svg"
import CancerIcon from "../../assets/sign-illustration/cancer.svg"
import LeoIcon from "../../assets/sign-illustration/leo.svg"
import VirgoIcon from "../../assets/sign-illustration/virgo.svg"
import LibraIcon from "../../assets/sign-illustration/libra.svg"
import ScorpioIcon from "../../assets/sign-illustration/scorpio.svg"
import SagittariusIcon from "../../assets/sign-illustration/sagittarius.svg"
import CapricornIcon from "../../assets/sign-illustration/capricorn.svg"
import AquariusIcon from "../../assets/sign-illustration/aquarius.svg"
import PiscesIcon from "../../assets/sign-illustration/pisces.svg"

import ReactMarkdown from "react-markdown"
import "./styles/article.css"

const Horoscopes = ({
  title,
  foreword,
  aries_horoscope,
  taurus_horoscope,
  gemini_horoscope,
  cancer_horoscope,
  leo_horoscope,
  virgo_horoscope,
  libra_horoscope,
  scorpio_horoscope,
  sagittarius_horoscope,
  capricorn_horoscope,
  aquarius_horoscope,
  pisces_horoscope,
  author,
  category,
  date,
  cover,
  authorPath,
  categoryPath,
}) => {
  return (
    <Layout heroIsVisible={false}>
      <div className="header">
        <img src={cover} />
      </div>
      <div className="main-column">
        <h2 className="title shadow">{title}</h2>
        <div className="article-container">
          <p className="foreword">{foreword}</p>
          <p className="disclaimer">
            disclaimer about how uneffective horoscopes really are
          </p>
          <QuickAccessBar />
          <h3 className="sign-name" id="Aries">
            Aries
          </h3>
          <p>
            <AriesIcon className="sign-icon" />
            <ReactMarkdown source={aries_horoscope} />
          </p>
          <h3 className="sign-name" id="Taurus">
            Taurus
          </h3>
          <p>
            <TaurusIcon className="sign-icon" />
            <ReactMarkdown source={taurus_horoscope} />
          </p>
          <h3 className="sign-name" id="Gemini">
            Gemini
          </h3>
          <p>
            <GeminiIcon className="sign-icon" />
            <ReactMarkdown source={gemini_horoscope} />
          </p>
          <h3 className="sign-name" id="Cancer">
            Cancer
          </h3>
          <p>
            <CancerIcon className="sign-icon" />
            <ReactMarkdown source={cancer_horoscope} />
          </p>
          <h3 className="sign-name" id="Leo">
            Leo
          </h3>
          <p>
            <LeoIcon className="sign-icon" />
            <ReactMarkdown source={leo_horoscope} />
          </p>
          <h3 className="sign-name" id="Virgo">
            Virgo
          </h3>
          <p>
            <VirgoIcon className="sign-icon" />
            <ReactMarkdown source={virgo_horoscope} />
          </p>
          <h3 className="sign-name" id="Libra">
            Libra
          </h3>
          <p>
            <LibraIcon className="sign-icon" />
            <ReactMarkdown source={libra_horoscope} />
          </p>
          <h3 className="sign-name" id="Scorpio">
            Scorpio
          </h3>
          <p>
            <ScorpioIcon className="sign-icon" />
            <ReactMarkdown source={scorpio_horoscope} />
          </p>
          <h3 className="sign-name" id="Sagittarius">
            Sagittarius
          </h3>
          <p>
            <SagittariusIcon className="sign-icon" />
            <ReactMarkdown source={sagittarius_horoscope} />
          </p>
          <h3 className="sign-name" id="Capricorn">
            Capricorn
          </h3>
          <p>
            <CapricornIcon className="sign-icon" />
            <ReactMarkdown source={capricorn_horoscope} />
          </p>
          <h3 className="sign-name" id="Aquarius">
            Aquarius
          </h3>
          <p>
            <AquariusIcon className="sign-icon" />
            <ReactMarkdown source={aquarius_horoscope} />
          </p>
          <h3 className="sign-name" id="Pisces">
            Pisces
          </h3>
          <p>
            <PiscesIcon className="sign-icon" />
            <ReactMarkdown source={pisces_horoscope} />
          </p>

          <h6 className="author-date">
            Posted by <Link to={authorPath}>{author}</Link> on {date} in{" "}
            {category.map(category => {
              return (
                <>
                  <Link to={`/category/${category.name}`}>{category.name}</Link>
                  <span>, </span>
                </>
              )
            })}
          </h6>
        </div>
      </div>
    </Layout>
  )
}

export default Horoscopes
