import React from "react"
import { Pane } from "evergreen-ui"

export const TopBar = (props) => {
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
