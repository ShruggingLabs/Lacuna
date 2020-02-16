import React from "react"

import { LeftMenuColumn } from "./LeftMenuColumn"
import { Canvas } from "./Canvas"
import { CanvasControlPanel } from "./CanvasControlPanel"
import { Canvas as Canva } from "../Canvas"
import Store from "../../state/index"
import { observer } from "mobx-react"
import GoogleFontLoader from "react-google-font-loader"

export const Editor = observer((props) => {
  const fonts = Store.allFontNames

  useGoogleFontLoader({
    onLoading: () => {
      Store.setIsLoadingFont(true)
    },
    onReady: () => {
      setTimeout(() => {
        Store.setIsLoadingFont(false)
      }, 250)
    },
    fonts
  })

  return (
    <div className='Editor'>
      {/* <FontLoader fonts={fonts} /> */}
      <LeftMenuColumn />
      <Canva layers={Store.layers} fonts={fonts} />
      <CanvasControlPanel />
    </div>
  )
})

export const useGoogleFontLoader = (options) => {
  const [loadedFonts, setLoadedFonts] = React.useState([])

  React.useEffect(() => {
    if (options.fonts.length) {
      WebFont.load({
        loading: options.onLoading,
        active: options.onReady,
        inactive: options.inactive,
        fontloading: options.fontloading,
        fontactive: options.fontactive,
        fontinactive: options.fontinactive,
        google: {
          families: options.fonts
        }
      })
    }
  }, [options.fonts])

  return null
}
