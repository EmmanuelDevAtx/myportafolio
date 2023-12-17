import * as React from "react";
import { Global } from "@emotion/react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";


const drawerBleeding = 56;

interface Props {
  isOpenXsNav: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export default function SmallNav(props: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  function OnPressNavigation(nav: string) {
    router.push(nav)
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
            <ListItemButton onClick={() => OnPressNavigation('/')}>
              <ListItemText primary={t("navigation.titles.home")} />
            </ListItemButton>

            <ListItemButton onClick={() => OnPressNavigation('/about')}>
              <ListItemText primary={t("navigation.titles.about")} />
            </ListItemButton>

            <ListItemButton onClick={() => OnPressNavigation('/proyects')}>
              <ListItemText primary={t("navigation.titles.proyects")} />
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
