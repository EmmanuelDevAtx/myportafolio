import { Box, SxProps, Theme } from "@mui/material";
import { TargetAndTransition, VariantLabels, motion } from "framer-motion";
import { useState } from "react";

export const ButtonToggle = ({
    CustomIcon1,
    CustomIcon2,
    CustomIcon3,
    isActive,
    IconColor,
    onPress,
    whileHover,
    containerSx,
    key
  }: {
    key?: string,
    CustomIcon1?: any;
    CustomIcon2?: any;
    CustomIcon3?: any;
    isActive?: boolean;
    IconColor?: string;
    onPress: () => void;
    whileHover?: TargetAndTransition ;
    containerSx?: SxProps<Theme>;
  }) => {
    const [active, setActive] = useState<boolean>(isActive ?? false);
  
    function toggleButtonAction() {
      onPress();
      setActive(!active);
    }
    return (
      <motion.div
        key={key}
        style={{
          height: 43,
          width: 43,
        }}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1, rotate: 45, ...whileHover }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%",
        }}
        onClick={toggleButtonAction}
      >
        <Box
          sx={{
            height: 43,
            width: 43,
            border: 1,
            borderColor: IconColor,
            borderRadius: "100%",
            padding: 0.5,
            ...containerSx,
          }}
        >
          {!active ? (
            <CustomIcon1 style={{
              fill: IconColor
            }} />
          ) : CustomIcon2 ? (
            CustomIcon2 && <CustomIcon2 style={{
              fill: IconColor
            }} />
          ) : (
            CustomIcon1 && <CustomIcon1 style={{
              fill: IconColor
            }} />
          )}
          {CustomIcon3}
        </Box>
      </motion.div>
    );
  };
  