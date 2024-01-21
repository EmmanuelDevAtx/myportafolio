import { createTheme } from "@mui/material";

export const dark_theme = createTheme({
    palette: {
      mode:'dark',
      background:{
        default:"#101417",
        paper:"#7750B4",
      },
      primary: {
        main: "#31B9D5"
      },
      secondary: {
        main: "#8F8F8F",
      },
      progress: {
        background: '#167f94',
        primary:'#31B9D5'
      }
    },
});