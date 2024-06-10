import { Grid, Typography } from "@mui/material"
import { SnakeTimeLine } from "../timeline/components/timeLine"
import { DirectionRow } from "../timeline/helpers/grid.Calculate"
import { enumDirecctionColumn } from "../timeline/class"

export const BackGround = ()=>{

    /**
     * This is only test data, will change the estruture in the future
     */
    const item = <div style={{backgroundColor:'red'}}/>;
    const dataTest1 = [ item, <div style={{backgroundColor:'red'}}/>,<div style={{backgroundColor:'red'}}/>, <div style={{backgroundColor:'red'}}/>, <div style={{backgroundColor:'red'}}/>]
    const dataTest = [...dataTest1, "title1", "title2", "title3", "title4", "title5", "title101"]
    return (
        <Grid container id="background" spacing={6}>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h4" color="primary">
                    My background
                </Typography>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <SnakeTimeLine isContinue direcctionColumn={enumDirecctionColumn.startToEnd} startTimeLine={DirectionRow.leftToRigth} maxItemsPerRow={3} data={dataTest}/>
            </Grid>
        </Grid>
    )
}