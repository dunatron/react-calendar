export function setLanguage(language) {
  return {
    type: "SET_LANGUAGE",
    payload: language,
  }
}

// export const localeSet = lang => ({
//   type: "SET_LANGUAGE",
//   lang,
// })

// export const setLocale = lang => dispatch => {
//   localStorage.setItem("localeLang", lang)
//   dispatch(localeSet(lang))
// }
