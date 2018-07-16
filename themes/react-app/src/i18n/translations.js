import { addLocaleData } from "react-intl"
import enLocaleData from "react-intl/locale-data/en"
import zhLocaleData from "react-intl/locale-data/zh"
import ruLocaleData from "react-intl/locale-data/ru"

import enTranslationMessages from "./locales/en.json"
import zhTranslationMessages from "./locales/zh.json"
import ruTranslationMessages from "./locales/ru.json"
import fletchersTranslationMessages from "./locales/en-fletchers.json"
import { DEFAULT_LOCALE } from "../constants"

addLocaleData(
  enLocaleData.concat({ locale: "en-fletchers", parentLocale: "en" })
)
addLocaleData(zhLocaleData)
addLocaleData(ruLocaleData)

export const appLocales = [DEFAULT_LOCALE, "zh"]
// export const appLocales = ["en", "mi"]

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return {
      ...formattedMessages,
      [key]: formattedMessage,
    }
  }, {})
}

export const translations = {
  en: formatTranslationMessages("en", enTranslationMessages),
  zh: formatTranslationMessages("zh", zhTranslationMessages),
  ru: formatTranslationMessages("ru", ruTranslationMessages),
  "en-fletchers": formatTranslationMessages(
    "en-fletchers",
    fletchersTranslationMessages
  ),
}
