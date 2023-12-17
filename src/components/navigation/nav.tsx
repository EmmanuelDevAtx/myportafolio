import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { TargetAndTransition, VariantLabels, motion } from "framer-motion";
import { useSettings } from "@/hooks/settingsContext";

import DarkModeIcon from "/public/svg/navigation/dark_mode.svg";
import LightModeIcon from "/public/svg/navigation/light_mode.svg";
import LangEsIcon from "/public/svg/navigation/lang_es.svg";
import LangUsIcon from "/public/svg/navigation/lang_us.svg";

export const Navigation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const { setDarkMode, isDarkMode, changeLanguage } = useSettings();
  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={{
        paddingY: 3,
      }}
    >
      <Grid item md={4}></Grid>
      <Grid item md={4}>
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
              onPress={() => router.push("/")}
            />
            <ItemNavigation
              title={t("navigation.titles.about")}
              isActive={pathname === "/about"}
              onPress={() => router.push("/about")}
            />
            <ItemNavigation
              title={t("navigation.titles.proyects")}
              isActive={pathname === "/proyects"}
              onPress={() => router.push("/proyects")}
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item md={4}>
        <Stack direction={"row"} justifyContent={"center"} height={'100%'} spacing={3} alignItems={'center'}>
          <ButtonToggle
            CustomIcon1={DarkModeIcon}
            CustomIcon2={LightModeIcon}
            isActive={false}
            onPress={()=>setDarkMode(!isDarkMode)}
            IconColor={theme.palette.text.primary}
          />
          
          <ButtonToggle
            CustomIcon1={LangEsIcon}
            CustomIcon2={LangUsIcon}
            isActive={false}
            onPress={changeLanguage}
            IconColor={theme.palette.text.primary}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

const ItemNavigation = ({
  title,
  onPress,
  isActive,
}: {
  title: string;
  onPress: () => void;
  isActive: boolean;
}) => {
  const theme = useTheme();

  return (
    <Typography
      onClick={onPress}
      sx={{
        paddingBottom: 1,
        borderColor: theme.palette.primary.main,
        borderBottom: `1px solid ${
          !isActive ? "transparent" : theme.palette.primary.main
        }`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          color: theme.palette.primary.main,
          cursor: "pointer",
          borderBottom: "1px solid",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {title}
    </Typography>
  );
};

const ButtonToggle = ({
  CustomIcon1,
  CustomIcon2,
  isActive,
  IconColor,
  onPress,
  whileHover
}: {
  CustomIcon1: any;
  CustomIcon2: any;
  isActive?: boolean;
  IconColor?: string;
  onPress: ()=> void;
  whileHover?: VariantLabels | TargetAndTransition | undefined
}) => {
  const [active, setActive] = useState<boolean>(isActive ?? false);

  function toggleButtonAction() {
    onPress();
    setActive(!active);
  }
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 45,}}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: "100%"
      }}
      onClick={toggleButtonAction}
    >
      <Box sx={{  height:43, width:43 , border:1, borderColor: IconColor, borderRadius:'100%', padding:0.5}}>
        {!active ? (
          <CustomIcon1 style={{ fill:IconColor }} />
        ) : (
          <CustomIcon2 style={{ fill:IconColor }} />
        )}
      </Box>
    </motion.div>
  );
};
