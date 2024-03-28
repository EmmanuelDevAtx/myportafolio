import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Welcome } from "./welcome";
import { MySkills } from "../custom/mtSkills";
import { Navigation } from "../navigation/nav";
import { useSettings } from "@/hooks/settingsContext";
import { MyProjects } from "../custom/myProyects";
import { TestThreeJs } from "../custom/testThree";
import { AboutMe } from "../aboutme/about.me";
import { BackGround } from "../background/background";

export const MainData = () => {
  const { t } = useTranslation();
  const { isSmallScreen, width } = useSettings();


  return (
    <Grid container rowSpacing={10} marginBottom={!isSmallScreen ? 25 : 60}>
      <Grid item md={12} sm={12} xs={12}>
        <Navigation />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3, paddingY: 3 }}>
        <Welcome />
      </Grid>
      <Box sx={{ height: '100%', width: '100%', position: 'fixed', zIndex: -1 }}>
        <TestThreeJs />
      </Box>
      <Grid item md={12} sm={12} xs={12}>
        <MySkills />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3, paddingBottom: !isSmallScreen? 0 : 10 }}>
        <MyProjects />
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3 }}>
        <AboutMe/>
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ paddingX: !isSmallScreen ? (width * 0.02) : 3 }}>
        <BackGround/>
      </Grid>
    </Grid>
  );
};
