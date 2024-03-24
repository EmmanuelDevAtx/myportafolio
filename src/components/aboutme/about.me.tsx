import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const AboutMe = () => {

    const { t } = useTranslation();

    return (
        <Grid container rowSpacing={4}>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h4" id="about-me">{t('about_me.title')}</Typography>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <Grid container columnSpacing={10}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Stack spacing={2}>
                            <Typography variant="body2" id="about-me">{t('about_me.description_1')}</Typography>
                            <Typography variant="body2" id="about-me">{t('about_me.description_2')}</Typography>
                            <Typography variant="body2" id="about-me">{t('about_me.description_3')}</Typography>
                        </Stack>

                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Stack alignItems={'center'} spacing={3}>
                            <Avatar
                                alt="Astratos games"
                                src="/webp/astratos.webp"
                                sx={{ width: 170, height: 170 }}
                            />
                            <Typography variant="body1" textAlign={'center'} id="about-me" color="primary">{t('about_me.phrase')}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}