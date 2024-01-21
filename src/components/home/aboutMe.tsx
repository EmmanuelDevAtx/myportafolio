import React, { useState } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { scroll } from "framer-motion";
import { LineProgress } from "../custom/lineProgress";

export const AboutMe = () => {
  const [progress, setProgress] = useState<number>();
  scroll((progress) => setProgress(progress * 100));
  return (
    <Grid container>
      <Grid item md={5.5}>
        <Box height={500} />
      </Grid>
      <Grid
        item
        md={1}
      >
        <LineProgress progress={progress} direction='vertical'/>
      </Grid>
      <Grid item md={5.5}>
        <Box height={1500} />

      </Grid>
    </Grid>
  );
};
