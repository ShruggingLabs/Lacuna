import "./setup"

import React from "react"
import { useProvider, createStore } from "mobx-store-provider"

import { Editor } from "./features/Editor"
import Store from "./state"
import "./styles/blueprint.css"
import "./styles/blueprint-icons.css"
import "./styles/index.css"

import { ThemeProvider, defaultTheme, Pane } from "evergreen-ui"

export default function App() {
  const Provider = useProvider()
  const store = createStore(() => Store)
  return (
    <ThemeProvider value={defaultTheme}>
      <Provider value={store}>
        <div className='ProjectEditor'>
          <TopBar />
          <Editor />
        </div>
      </Provider>
    </ThemeProvider>
  )
}

const TopBar = (props) => {
  return (
    <div className='TopBar'>
      <Pane
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingX='24px'
        // backgroundColor='rgba(54, 174, 232, 0.16)'
        borderRight='1px solid var(--colorGrayscale2)'
        height='100%'
      >
        <img src='images/lacuna-logo-mark-0.svg' style={{ maxWidth: 30 }} />
      </Pane>
    </div>
  )
}
