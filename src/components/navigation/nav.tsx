import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";

export const Navigation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item md={4}></Grid>
      <Grid item md={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: 3,
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
      <Grid item md={4}></Grid>
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
