import { useSettings } from "@/hooks/settingsContext"
import { Divider, Grid, Stack, Typography, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import LinkedinSvg from '/public/svg/socialMedia/linkedin.svg';
import GitHubSvg from '/public/svg/socialMedia/github.svg';

export const Welcome = () => {

  const { t } = useTranslation();
  const { isSmallScreen } = useSettings();
  const theme  = useTheme();

  function RedirectLink(url: string) {
    window.open(url);
  };

  return (
    <Grid container spacing={10} id="home">
      <Grid item md={5} height={"100%"} sx={{ alignSelf: "center"}}>
        <motion.div
          animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
          initial={{ x: -100, opacity: 0 }}
        >
          <Typography variant="body1">{t("home.main_text.hello")}</Typography>
        </motion.div>

        <motion.div
          animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
          initial={{ x: -100, opacity: 0 }}
        >
          <Typography variant="h4" color={"primary"}>
            {t("home.main_text.name")}
          </Typography>
        </motion.div>

        <motion.div
          animate={{ x: 0, opacity: 1, transition: { duration: 1.5 } }}
          initial={{ x: -100, opacity: 0 }}
        >
          <Stack spacing={2} marginTop={3}>
            <Typography variant="body1">
              {t("home.main_text.description1")}
            </Typography>
            <Typography variant="body1">
              {t("home.main_text.description2")}
            </Typography>

            <Stack direction={'row'}>
              <motion.div
                onClick={() => RedirectLink('https://www.linkedin.com/in/emmanuel-mejia-morales-41a969240/')}
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 1.2, rotate: 20 }}
                animate={{ transition: { duration: 1.5, ease: 'ease' } }}>
                <LinkedinSvg />
              </motion.div>
              <motion.div
                onClick={() => RedirectLink('https://github.com/EmmanuelDevAtx')}
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 1.2, rotate: 20 }}
                animate={{ transition: { duration: 1.5, ease: 'ease' } }}>
                <GitHubSvg fill={theme.palette.text.primary}/>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>
      </Grid>

      {!isSmallScreen &&
        <Grid item md={1}>
          <motion.div
            style={{ height: '100%' }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            initial={{ opacity: 0 }}
          >
            <Divider orientation="vertical" sx={{ height: "100%" }} />
          </motion.div>
        </Grid>

      }

      <Grid item md={5}>
        <motion.div
          animate={{ x: 0, opacity: 1, transition: { duration: 1.5 } }}
          initial={{ x: 100, opacity: 0 }}
        >
          <Typography variant="h2">{t("home.main_text.who_am_i")}</Typography>
        </motion.div>
      </Grid>
    </Grid>
  )
}