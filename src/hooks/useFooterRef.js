import React from "react"

export const useFooterRef = () => {
  const [footerRef, setNewFooterRef] = React.useState()

  const setFooterRef = React.useCallback(ref => {
    setNewFooterRef(ref)
  }, [])

  return {
    footerRef,
    setFooterRef,
  }
}
