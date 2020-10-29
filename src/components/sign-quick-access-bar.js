import React from "react"
import { Link } from "gatsby"

import AriesGlyph from "../../assets/sign-glyph/aries.svg"
import TaurusGlyph from "../../assets/sign-glyph/taurus.svg"
import GeminiGlyph from "../../assets/sign-glyph/gemini.svg"
import CancerGlyph from "../../assets/sign-glyph/cancer.svg"
import LeoGlyph from "../../assets/sign-glyph/leo.svg"
import VirgoGlyph from "../../assets/sign-glyph/virgo.svg"
import LibraGlyph from "../../assets/sign-glyph/libra.svg"
import ScorpioGlyph from "../../assets/sign-glyph/scorpio.svg"
import SagittariusGlyph from "../../assets/sign-glyph/sagittarius.svg"
import CapricornGlyph from "../../assets/sign-glyph/capricorn.svg"
import AquariusGlyph from "../../assets/sign-glyph/aquarius.svg"
import PiscesGlyph from "../../assets/sign-glyph/pisces.svg"

const QuickAccessBar = () => {
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Jump to sign:</p>
      <ul className="quick-access-bar">
        <li>
          <Link to="#Aries">
            <AriesGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Taurus">
            <TaurusGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Gemini">
            <GeminiGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Cancer">
            <CancerGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Leo">
            <LeoGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Virgo">
            <VirgoGlyph />
          </Link>
        </li>
      </ul>

      <ul className="quick-access-bar">
        <li>
          <Link to="#Libra">
            <LibraGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Scorpio">
            <ScorpioGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Sagittarius">
            <SagittariusGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Capricorn">
            <CapricornGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Aquarius">
            <AquariusGlyph />
          </Link>
        </li>
        <li>
          <Link to="#Pisces">
            <PiscesGlyph />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default QuickAccessBar
