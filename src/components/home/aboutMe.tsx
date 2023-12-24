import React, { useState } from "react";
import { Grid, LinearProgress } from "@mui/material";
import { scroll } from "framer-motion";

export const AboutMe = () => {
  const [progress, setProgress] = useState<number>();
  scroll((progress) => setProgress(progress * 100));
  return (
    <Grid container>
      <Grid item md={5.5}></Grid>
      <Grid
        item
        md={1}
        style={{
          transform: "rotate(90deg)",
          width: "100%",
        }}
      >
        <LinearProgress variant="determinate" value={progress} />
      </Grid>
      <Grid item md={5.5}></Grid>
    </Grid>
  );
};
