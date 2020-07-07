import React from "react"
import Layout from "../components/layout"
import Article from "../components/article"

export default props => {
  let horoscopes = []
  if (props.pageContext.horoscope != null) {
    horoscopes = [
      props.pageContext.horoscope.aries,
      props.pageContext.horoscope.aries_horoscope,
      props.pageContext.horoscope.taurus,
      props.pageContext.horoscope.taurus_horoscope,
      props.pageContext.horoscope.gemini,
      props.pageContext.horoscope.gemini_horoscope,
      props.pageContext.horoscope.cancer,
      props.pageContext.horoscope.cancer_horoscope,
      props.pageContext.horoscope.leo,
      props.pageContext.horoscope.leo_horoscope,
      props.pageContext.horoscope.virgo,
      props.pageContext.horoscope.virgo_horoscope,
      props.pageContext.horoscope.libra,
      props.pageContext.horoscope.libra_horoscope,
      props.pageContext.horoscope.scorpio,
      props.pageContext.horoscope.scorpio_horoscope,
      props.pageContext.horoscope.sagittarius,
      props.pageContext.horoscope.sagittarius_horoscope,
      props.pageContext.horoscope.capricorn,
      props.pageContext.horoscope.capricorn_horoscope,
      props.pageContext.horoscope.aquarius,
      props.pageContext.horoscope.aquarius_horoscope,
      props.pageContext.horoscope.pisces,
      props.pageContext.horoscope.pisces_horoscope,
    ]
  }

  return (
    <Article
      title={props.pageContext.title}
      content={props.pageContext.content + horoscopes}
      author={props.pageContext.author.name}
      category={props.pageContext.categories.name}
      date={props.pageContext.created_at}
      cover={props.pageContext.cover.publicURL}
    />
  )
}
