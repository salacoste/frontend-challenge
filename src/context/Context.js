import React, { createContext } from 'react'

export let themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  },
  active: 'dark',
  // changeTheme: ()=> {
  //   console.log('changing!')
  //   themes.active === 'light'? themes.active = 'dark' : themes.active = 'light'
  //   console.log(themes)
  //   return {...themes}
  // }
};

export let ThemeContext = createContext(themes.light);