import { Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Welcome } from "./welcome";
import { AboutMe } from "./aboutMe";

export const MainData = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ paddingTop: 10 }}>
      <Grid container spacing={10}>
        <Grid item md={12}>
          <Welcome />
        </Grid>

        <Grid item md={12}>
          <AboutMe />
        </Grid>
      </Grid>
    </Container>
  );
};
