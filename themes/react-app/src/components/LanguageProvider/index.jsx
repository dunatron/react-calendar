import React from "react"
import { IntlProvider } from "react-intl"
import { translations } from "../../i18n/translations"

export const LanguageProvider = ({ locale, children }) => {
  const localeMessages = translations[locale]
  // console.group("LanguageProvider")
  // console.log("locale ", locale)
  // console.log("translations ", translations)
  // console.log("local translations ", translations[locale])
  // console.groupEnd()
  return (
    <IntlProvider key={locale} locale={locale} messages={localeMessages}>
      {React.Children.only(children)}
    </IntlProvider>
  )
}

export default LanguageProvider
