import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const MainData = ()=>{
  const { t } = useTranslation();

    return(
        <Container sx={{ paddingTop: 10 }}>
        <Grid container spacing={10}>
          <Grid item md={5} height={"100%"} sx={{ alignSelf: "center" }}>
            <Typography variant="body1">{t("home.main_text.hello")}</Typography>
            <Typography variant="h4" color={"primary"}>
              {t("home.main_text.name")}
            </Typography>
            <Stack spacing={2} marginTop={3}>
              <Typography variant="body1">
                {t("home.main_text.description1")}
              </Typography>
              <Typography variant="body1">
                {t("home.main_text.description2")}
              </Typography>
            </Stack>
          </Grid>

          <Grid md={1}>
            <Divider orientation="vertical" sx={{ height: "100%" }} />
          </Grid>

          <Grid item md={5}>
            <Typography variant="h2">{t("home.main_text.who_am_i")}</Typography>
          </Grid>
        </Grid>
      </Container>
    )
}