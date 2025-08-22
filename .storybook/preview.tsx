import type {Preview} from "@storybook/react"
import {StrictMode} from "react"
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
      <StrictMode>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StrictMode>
    ),
  ],
}

export default preview
