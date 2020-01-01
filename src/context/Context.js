import React, { createContext } from 'react'

export let themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

export let ThemeContext = createContext(themes.light);