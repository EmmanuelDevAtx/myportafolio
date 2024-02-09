import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Welcome } from "./welcome";
import { AboutMe } from "./aboutMe";
import CssStyles from "../../app/page.module.css";
import { MySkills } from "../custom/mtSkills";
import { Navigation } from "../navigation/nav";
import { useSettings } from "@/hooks/settingsContext";

export const MainData = () => {
  const { t } = useTranslation();
  const { isSmallScreen } = useSettings();

  return (
    <Grid container rowSpacing={10}>
      <Grid item md={12} sx={{ paddingX: !isSmallScreen ? 30 : 0 }}>
        <Navigation />
      </Grid>
      <Grid item md={12} sx={{ paddingX: !isSmallScreen ? 30 : 0 }}>
        <Welcome />
      </Grid>
      <Grid item md={12}>
        <MySkills />
      </Grid>
    </Grid>
  );
};
