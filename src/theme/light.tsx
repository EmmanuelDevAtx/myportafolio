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
      mode:'light',
      primary: {
        main: "#000000"
      },
      secondary: {
        main: "#282828",
      },
      
    },
  });