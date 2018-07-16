const fs = require("fs")
const mkdirpSync = require("mkdirp").sync
const path = require("path")

const MESSAGES = path.join(__dirname, "../src/i18n/messages/messages.json")
const LANG_DIR = path.join(__dirname, "../src/i18n/locales/")

const file = fs.readFileSync(MESSAGES, "utf8")

const defaultMessages = JSON.parse(file).reduce((collection, message) => {
  if (message.id in collection) {
    throw new Error(`Duplicate message id: ${message.id}`)
  }

  collection[message.id] = message.defaultMessage

  return collection
}, {})

mkdirpSync(LANG_DIR)
fs.writeFileSync(
  LANG_DIR + "en.json",
  JSON.stringify(
    Object.keys(defaultMessages)
      .sort()
      .reduce((r, k) => ((r[k] = defaultMessages[k]), r), {}),
    null,
    2
  )
)
