import { useSettings } from "@/hooks/settingsContext"
import { Divider, Grid, Stack, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const Welcome = () => {

  const { t } = useTranslation();
  const { isSmallScreen } = useSettings();

  return (
    <Grid container spacing={10}>
      <Grid item md={5} height={"100%"} sx={{ alignSelf: "center" }}>
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