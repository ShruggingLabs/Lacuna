import "./setup"

import React from "react"
import { useProvider, createStore } from "mobx-store-provider"

import { Editor } from "./features/Editor"
import Store from "./state"
import "./styles/blueprint.css"
import "./styles/blueprint-icons.css"
import "./styles/index.css"
import "react-data-grid/dist/react-data-grid.css"
import "react-datasheet/lib/react-datasheet.css"

import { TopBar } from "./components/TopBar"

import { ThemeProvider, defaultTheme, Pane } from "evergreen-ui"
import { Router } from "./Router"
import { useGoogleFontLoader } from "./state/useGoogleFontLoader"
import { observer } from "mobx-react"

const App = observer((props) => {
  useGoogleFontLoader()

  return (
    <ThemeProvider value={defaultTheme}>
      <Router />
    </ThemeProvider>
  )
})

export default App
