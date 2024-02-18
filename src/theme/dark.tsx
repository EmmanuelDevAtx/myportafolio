import { createTheme } from "@mui/material";

export const dark_theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#101417",
      paper: "#161c21",
    },
    primary: {
      main: "#31B9D5"
    },
    secondary: {
      main: "#8F8F8F",
    },
    progress: {
      background: '#167f94',
      primary: '#31B9D5'
    },
    cardProyect: {
      main:'#f0f0f0',
      disable:'#dedede'
    },

  },
});