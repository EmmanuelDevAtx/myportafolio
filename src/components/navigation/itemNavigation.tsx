import { Typography, useTheme } from "@mui/material";

export const ItemNavigation = ({
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
          borderBottom: `1px solid ${!isActive ? "transparent" : theme.palette.primary.main
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