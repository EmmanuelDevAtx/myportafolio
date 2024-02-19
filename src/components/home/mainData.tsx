import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Welcome } from "./welcome";
import { MySkills } from "../custom/mtSkills";
import { Navigation } from "../navigation/nav";
import { useSettings } from "@/hooks/settingsContext";
import { MyProjects } from "../custom/myProyects";

export const MainData = () => {
  const { t } = useTranslation();
  const { isSmallScreen, width } = useSettings();

  return (
    <Grid container rowSpacing={10}>
      <Grid item md={12} sm={12} xs={12}>
        <Navigation />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3,  }}>
        <Welcome />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <MySkills />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3 }}>
        <MyProjects/>
      </Grid>
    </Grid>
  );
};
