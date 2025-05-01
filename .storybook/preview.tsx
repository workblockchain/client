import type {Preview} from "@storybook/react"
import React from "react"
import {ThemeProvider} from "styled-components"
import "../src/i18n"
import "../src/root.css"
import {GlobalStyles} from "../src/styles/globalStyles"
import {theme} from "../src/styles/theme"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
