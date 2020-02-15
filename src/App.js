import "./setup"

import React from "react"
import { useProvider, createStore } from "mobx-store-provider"

import { Editor } from "./features/Editor"
import Store from "./state"
import "./styles/blueprint.css"
import "./styles/blueprint-icons.css"
import "./styles/index.css"

export default function App() {
  const Provider = useProvider()
  const store = createStore(() => Store)
  return (
    <Provider value={store}>
      <div className='ProjectEditor'>
        <TopBar />
        <Editor />
      </div>
    </Provider>
  )
}

const TopBar = (props) => {
  return <div className='TopBar'>{props.children}</div>
}
