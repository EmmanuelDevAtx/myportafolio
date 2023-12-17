import { createTheme } from "@mui/material";


declare module '@mui/material/styles' {
    interface Palette {
      palette?: {
        danger: string;
      };
    }
    
    interface PaletteOptions {
        palette?: {
        danger?: string;
      };
    }
  }


export const ligth_theme = createTheme({
  palette: {
    mode:"light",
    background:{
      default:"#DFDFDF",
      paper:"#7750B4",
    },
    primary: {
      main: "#31B9D5"
    },
    secondary: {
      main: "#8F8F8F",
    },
  },
  });