import type {Preview} from "@storybook/react"
import {ThemeProvider} from "styled-components"
import "../src/i18n"
import "../src/index.css"
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
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
