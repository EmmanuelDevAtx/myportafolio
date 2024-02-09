import React, { useState } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { scroll } from "framer-motion";
import { LineProgress } from "../custom/lineProgress";
import { MySkills } from "../custom/mtSkills";

export const AboutMe = () => {
  
  return (
    <Grid container>
      <Grid item md={12}>
        <MySkills/>
      </Grid>
    </Grid>
  );
};
