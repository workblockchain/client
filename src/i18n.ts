import i18n from "i18next"
import {initReactI18next} from "react-i18next"

import enTranslations from "./i18n/en.json"
import zhTranslations from "./i18n/zh.json"

const resources = {
  en: {
    translation: enTranslations,
  },
  zh: {
    translation: zhTranslations,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
