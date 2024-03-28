import * as React from "react";
import { Global } from "@emotion/react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";


const drawerBleeding = 56;

interface Props {
  isOpenXsNav: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export default function SmallNav(props: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  function OnPressNavigation(nav: string) {
      const element = document.getElementById(nav);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    props.setClose();
  }
  
  return (
    <Box sx={{ height: "100%" }}>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${-1 * drawerBleeding}px)`,
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        sx={{ backdropFilter: "blur(3px)" }}
        open={props.isOpenXsNav}
        onClose={props.setClose}
        onOpen={props.setOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
      >
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <List sx={{ width: "100%", height: "100%" }}>
            <ListItemButton onClick={() => OnPressNavigation('/')} sx={{ transition: 'background-color 0.7s ease-in-out'}}>
              <ListItemText primary={t("navigation.titles.home")} />
            </ListItemButton>

            <ListItemButton onClick={() => OnPressNavigation('about-me')} sx={{ transition: 'background-color 0.7s ease-in-out'}}>
              <ListItemText primary={t("navigation.titles.about")} />
            </ListItemButton>

            <ListItemButton onClick={() => OnPressNavigation('proyects')} sx={{ transition: 'background-color 0.7s ease-in-out'}}>
              <ListItemText primary={t("navigation.titles.proyects")} />
            </ListItemButton>
            <ListItemButton onClick={() => OnPressNavigation('background')} sx={{ transition: 'background-color 0.7s ease-in-out'}}>
              <ListItemText primary={t("navigation.titles.background")} />
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
