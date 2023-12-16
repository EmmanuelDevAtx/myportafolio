import { createTheme } from "@mui/material";

export const dark_theme = createTheme({
    palette: {
      mode:'dark',
      background:{
        default:"#101417",
        paper:"#7750B4",
      },
      primary: {
        main: "#FFFFFF"
      },
      secondary: {
        main: "#8F8F8F",
      },
    },
  });