import React from "react"
import Horoscopes from "../components/horoscopes"

export default props => {
  return (
    <Horoscopes
      title={props.pageContext.title}
      foreword={props.pageContext.content}
      aries_horoscope={props.pageContext.horoscope.aries_horoscope}
      taurus_horoscope={props.pageContext.horoscope.taurus_horoscope}
      gemini_horoscope={props.pageContext.horoscope.gemini_horoscope}
      cancer_horoscope={props.pageContext.horoscope.cancer_horoscope}
      leo_horoscope={props.pageContext.horoscope.leo_horoscope}
      virgo_horoscope={props.pageContext.horoscope.virgo_horoscope}
      libra_horoscope={props.pageContext.horoscope.libra_horoscope}
      scorpio_horoscope={props.pageContext.horoscope.scorpio_horoscope}
      sagittarius_horoscope={props.pageContext.horoscope.sagittarius_horoscope}
      capricorn_horoscope={props.pageContext.horoscope.capricorn_horoscope}
      aquarius_horoscope={props.pageContext.horoscope.aquarius_horoscope}
      pisces_horoscope={props.pageContext.horoscope.pisces_horoscope}
      author={props.pageContext.author.name}
      category={props.pageContext.categories}
      date={props.pageContext.created_at}
      cover={props.pageContext.cover.childImageSharp.fluid}
    />
  )
}
