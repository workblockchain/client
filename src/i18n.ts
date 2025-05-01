// Copyright (c) 2025-present WorkBlockChain Team.
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//          http://license.coscl.org.cn/MulanPubL-2.0
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
// EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
// === Auto generated, DO NOT EDIT ABOVE ===

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
