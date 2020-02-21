import * as React from "react"
import { Router as Wouter, Switch, Route, useRouter, useLocation, useRoute } from "wouter"
import { TopBar } from "./components/TopBar"
import { Editor } from "./features/Editor"
import Store from "./state"
import { DOMCanvas } from "./features/DOMCanvas"

export const Router = (props) => {
  return (
    <>
      <Switch>
        <Route path='/' component={HomeView} />
        <Route path='/projects' component={ProjectsView} />
        <Route path='/projects/:projectId/editor' component={ProjectPreview} />
        <Route path='/projects/:projectId/preview' component={ProjectPreview} />
        <Route path='/:rest*'>404, not found!</Route>
      </Switch>
    </>
  )
}

const HomeView = (props) => {
  const [location, setLocation] = useLocation()
  const [isRootRoute] = useRoute("/")

  React.useEffect(() => {
    isRootRoute && setLocation("/projects/2Ful8McNxcefAlD23AjrMh/editor")
  }, [isRootRoute])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

const ProjectsView = () => {
  return (
    <div>
      <h1>Projects</h1>
    </div>
  )
}

const EditorView = (props) => {
  React.useEffect(() => {
    Store.loadProject(props.params.projectId)
  }, [])

  return (
    <div className='ProjectEditor'>
      <TopBar />
      <Editor />
    </div>
  )
}

const ProjectPreview = (props) => {
  const router = useRouter()

  React.useEffect(() => {
    Store.loadProject(props.params.projectId)
  }, [])

  return <DOMCanvas />
}
