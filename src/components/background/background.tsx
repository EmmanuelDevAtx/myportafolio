import { Grid, Typography } from "@mui/material"

export const BackGround = ()=>{
    return (
        <Grid container id="background">
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h4" color="primary">
                    My background
                </Typography>
            </Grid>
            <Grid item md={12} xs={12} sm={12}></Grid>
        </Grid>
    )
}