import { createTheme } from "@mui/material";


declare module '@mui/material/styles' {
  interface Palette {
    danger: string;
    progress: {
      background: string,
      primary: string
    }
  }

  interface PaletteOptions {
    danger?: string;
    progress?: {
      background?: string,
      primary?: string
    }
  }
}


export const ligth_theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#DFDFDF",
      paper: "#7750B4",
    },
    primary: {
      main: "#31B9D5"
    },
    secondary: {
      main: "#8F8F8F",
    },
    progress: {
      background: '#79def2',
      primary: '#31B9D5'
    }
  },
});