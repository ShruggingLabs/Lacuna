import * as React from "react"
import Store from "./index"
import { sleep } from "sleepjs"
import { nanoid } from "./../utilities/nanoid"

export const useGoogleFontLoader = (options = {}) => {
  const fonts = Store.allFontNames
  const loadingFonts = React.useRef([])
  const loadedFonts = React.useRef([])

  const removeFontFromList = (list, fontName) => {
    list.current = list.current.filter((font) => {
      return font !== fontName
    })
  }

  const onLoading = () => {
    Store.setIsLoadingFont(true)
  }

  const onReady = (a) => {
    setTimeout(() => {
      Store.setIsLoadingFont(false)
    }, 250)
  }

  const differentFonts = fonts.filter((fontName) => {
    const isFontLoading = loadingFonts.current.includes(fontName)
    const isFontLoaded = loadedFonts.current.includes(fontName)
    return !isFontLoading && !isFontLoaded
  })

  const onFontReady = (fontName, ...args) => {
    removeFontFromList(loadingFonts, fontName)
    loadedFonts.current.push(fontName)
    sleep(300).then(Store.addLoadedFont)
  }

  const onFontLoading = (fontName) => {
    loadingFonts.current.push(fontName)
  }

  React.useEffect(() => {
    if (differentFonts.length) {
      const families = differentFonts.map((fontName) => {
        return fontName + ALL_FONT_VARIATIONS
      })

      WebFont.load({
        loading: onLoading,
        active: onReady,
        inactive: options.inactive,
        fontloading: onFontLoading,
        fontactive: onFontReady,
        fontinactive: options.fontinactive,
        google: {
          families
        }
      })
    }
  }, [differentFonts.length ? nanoid() : 0])
}

const URL_PRE = "https://fonts.googleapis.com/css?family="
const URL_POST = "&display=swap"

const ALL_FONT_VARIATIONS =
  ":100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"

const getFontHref = (fontName) => {
  const name = fontName.replace(/\s/g, "+")
  return URL_PRE + name + ALL_FONT_VARIATIONS + URL_POST
}
