import { Avatar, Box, Button, Grid, Stack, Theme, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserData from '../../data/contact.data.json';
import { CustomIcon, IconsEnum } from "../svgIcons/icons";
import { motion, useMotionValueEvent, useScroll, useTransform, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useSettings } from "@/hooks/settingsContext";

export const Footer = () => {

    const [scrollPositionY, setScrollPositionY] = useState<number>(190);
    const theme = useTheme();
    const { scrollY } = useScroll();
    const { t } = useTranslation();
    const { isSmallScreen, isSpanish } = useSettings();


    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollPositionY(latest);
        const persent = (latest * 100) / (document?.body?.scrollHeight - window?.innerHeight);
        if (persent > 120) {
            setScrollPositionY(0);
        } else {
            setScrollPositionY(300);
        }
    })

    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: 999, bottom: 0 }}>
            <motion.div
                style={{
                    backgroundColor: theme.palette.background.default,
                    display: "flex",
                    height: !isSmallScreen ? '150px' : '300px',
                }}
                initial={{ opacity: 0 }}
                animate={{ y: scrollPositionY, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <Grid container justifyContent={'center'} columnSpacing={7}>
                    <Grid item md={2} sm={6} xs={6} alignContent={'center'}>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <Avatar
                                alt="Astratos games"
                                src="/webp/astratos.webp"
                                sx={{ width: 100, height: 100 }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={2} sm={6} xs={6} textAlign={!isSmallScreen ? 'center' : 'start'} alignContent={'center'}>
                        <Typography variant="h4" color={'primary'}>
                            {t('footer.contact_me')}
                        </Typography>
                        <Typography variant="caption">
                            {t('footer.contact_description')}
                        </Typography>
                    </Grid>
                    <Grid item md={2} sm={6} xs={6} alignContent={'center'} alignItems={'center'}>
                        <Stack alignItems={'center'} >
                            <Box>
                                {UserData.works.map((work, index) => (
                                    <ProductsItems key={"UserData.works"+index} text={isSpanish ? work.name_es : work.name_en} iconEnum={work.icon} theme={theme} />
                                ))}
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item md={2} sm={6} xs={6} alignContent={'center'}>
                        <Stack alignItems={'self-start'}>
                            {UserData.contact.map((contact, index) => {
                                return (
                                    <motion.div
                                    key={'UserData.contact '+index}
                                        style={{ margin: '7px 0px', cursor: 'pointer' }}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 1 }}>
                                        <Stack direction={'row'} alignItems={'center'}>
                                            {CustomIcon(contact.icon, theme.palette.background.default, '25px', '25px', theme.palette.text.primary)}
                                            <Typography>{contact.name}</Typography>
                                        </Stack>
                                    </motion.div>
                                );
                            })}
                        </Stack>
                    </Grid>
                </Grid>
            </motion.div>
        </div>
    );
}

export const ProductsItems = ({ text, iconEnum, theme, key }: { text: string, iconEnum: string, theme: Theme, key:string }) => (
    <Stack key={key} direction={'row'} alignItems={'center'} sx={{ margin: '16px 0px' }}>
        {CustomIcon(iconEnum, theme.palette.background.default, '15px', '15px', theme.palette.text.primary)}
        <Typography>
            {text}
        </Typography>
    </Stack>
);