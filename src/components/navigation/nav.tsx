import {
  Box,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/hooks/settingsContext";

import DarkModeIcon from "/public/svg/navigation/dark_mode.svg";
import LightModeIcon from "/public/svg/navigation/light_mode.svg";
import LangEsIcon from "/public/svg/navigation/lang_es.svg";
import LangUsIcon from "/public/svg/navigation/lang_us.svg";
import MenuIcon from "/public/svg/navigation/menu.svg";
import SmallNav from "./smallNav";
import { ButtonToggle } from "./buttonToggle";
import { ItemNavigation } from "./itemNavigation";

import NavigationCss from '@/styles/navigation.module.css';

export const Navigation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [isOpneSmallMenu, setIsOpenSmallMenu] = useState<boolean>(false);

  const { setDarkMode, isDarkMode, changeLanguage, isSmallScreen, isSpanish } =
    useSettings();

  function OnPressNavigation(nav: string) {
    const element = document.getElementById(nav);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <HideNavigation>
      {
        !isSmallScreen ? (
          <Grid
            container
            justifyContent={"space-between"}
            sx={{
              marginY: 3,
            }}
          >
            <Grid item md={4} xs={4} sm={4}></Grid>
            <Grid item md={4} xs={4} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack sx={{ padding: 2 }} direction={"row"} spacing={5}>
                  <ItemNavigation
                    title={t("navigation.titles.home")}
                    isActive={pathname === "/"}
                    onPress={() => OnPressNavigation("/")}
                  />
                  <ItemNavigation
                    title={t("navigation.titles.about")}
                    isActive={pathname === "/about"}
                    onPress={() => OnPressNavigation("about")}
                  />
                  <ItemNavigation
                    title={t("navigation.titles.proyects")}
                    isActive={pathname === "/proyects"}
                    onPress={() => OnPressNavigation("proyects")}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                height={"100%"}
                spacing={3}
                alignItems={"center"}
              >
                <ButtonToggle
                  CustomIcon1={DarkModeIcon}
                  CustomIcon2={LightModeIcon}
                  isActive={isDarkMode}
                  onPress={() => setDarkMode(!isDarkMode)}
                  IconColor={theme.palette.text.primary}
                />

                <ButtonToggle
                  CustomIcon1={LangEsIcon}
                  CustomIcon2={LangUsIcon}
                  isActive={!isSpanish}
                  onPress={changeLanguage}
                  IconColor={theme.palette.text.primary}
                />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            sx={{
              padding: 3,
              paddingRight: 8
            }}
          >
            <Grid item sm={1} xs={1}>
              <ButtonToggle
                CustomIcon1={MenuIcon}
                isActive={isDarkMode}
                onPress={() => setIsOpenSmallMenu(true)}
                IconColor={theme.palette.text.primary}
                containerSx={{ border: 0 }}
                whileHover={{ rotate:10}}
              />
            </Grid>
            <Grid item sm={9} xs={9}></Grid>
            <Grid item sm={2} xs={2}>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                height={"100%"}
                alignItems={"center"}
              >
                <ButtonToggle
                  CustomIcon1={DarkModeIcon}
                  CustomIcon2={LightModeIcon}
                  isActive={isDarkMode}
                  onPress={() => setDarkMode(!isDarkMode)}
                  IconColor={theme.palette.text.primary}
                />

                <ButtonToggle
                  CustomIcon1={LangEsIcon}
                  CustomIcon2={LangUsIcon}
                  isActive={!isSpanish}
                  onPress={changeLanguage}
                  IconColor={theme.palette.text.primary}
                />
              </Stack>
            </Grid>
            <SmallNav isOpenXsNav={isOpneSmallMenu} setOpen={() => setIsOpenSmallMenu(true)} setClose={() => setIsOpenSmallMenu(false)} />
          </Grid>
        )
      }
    </HideNavigation>
  )
};


const HideNavigation = ({ children }: { children: React.ReactNode | JSX.Element }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isAtTop, setIsAtTop] = useState<boolean>();

  const { isDarkMode } = useSettings();

  const values = isDarkMode ? 0 : 255;

  useEffect(() => {
    setIsAtTop(window.scrollY === 0 );
    let scrollTimeout = setTimeout(() => { });
    const handleScroll = () => {
      setScrolling(true);
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolling(false);
      }, 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <motion.div
    initial={{ y: -100 }}
    animate={{ y: scrolling ? -100 : -18 }}
    transition={{ duration: 0.5 }}
    className={NavigationCss.navigationTop}
    style={{
      backdropFilter: ` blur(${isAtTop ? 0 : 20}px)`,
      backgroundColor: `rgba(${values}, ${values}, ${values}, 0.${isAtTop ? 0 :isDarkMode ? 1 : 6})`
    }}
  >
    {children}
  </motion.div>
}
