import { Grid, Typography } from "@mui/material"
import { SnakeTimeLine } from "../timeline/components/timeLine"
import { DirectionRow } from "../timeline/helpers/grid.Calculate"
import { enumDirecctionColumn } from "../timeline/class"

export const BackGround = ()=>{

    /**
     * This is only test data, will change the estruture in the future
     */
    const dataTest1 = [{ title: "hola1" }, { title: "hola2" }, { title: "hola3" }, { title: "hola4" }, { title: "hola5" }, { title: "hola6" }, { title: "hola7" }]
    const dataTest = [...dataTest1, { title: "hola1" }, { title: "hola2" }, { title: "hola3" }, { title: "hola4" }, { title: "hola5" }, { title: "hola6" }, { title: "hola7" }]
    return (
        <Grid container id="background" spacing={6}>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h4" color="primary">
                    My background
                </Typography>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <SnakeTimeLine isContinue direcctionColumn={enumDirecctionColumn.endToStart} startTimeLine={DirectionRow.rigthToLeft} maxItemsPerRow={2} data={dataTest}/>
            </Grid>
        </Grid>
    )
}