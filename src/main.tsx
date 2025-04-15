import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {ThemeProvider} from "styled-components"
import App from "./App.tsx"
import "./i18n"
import "./index.css"
import {GlobalStyles} from "./styles/globalStyles"
import {theme} from "./styles/theme"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>
)
