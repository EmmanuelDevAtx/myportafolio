import { Grid, Typography } from "@mui/material";
import { ItemProyect, ItemProyectInputType } from "./itemProyect";
import DataProjects from "../../data/proyects.data.json";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const MyProjects = () => {
    const { t } = useTranslation();
    return (
        <Grid container columnSpacing={2} rowSpacing={5}>
            <Grid item md={12} sm={12} xs={12}>
                <motion.div
                    animate={{ x: 0, opacity: 1, transition: { duration: 2 } }}
                    initial={{ x: -100, opacity: 0 }}
                >
                    <Typography id="proyects" variant="h4"> {t('proyects.text')} </Typography>
                </motion.div>
            </Grid>
            {
                DataProjects.data.map((item: ItemProyectInputType, index: number) => {
                    return <Grid key={'CardProyects' + item.title + index} item md={DataProjects.data.length >= 3 ? 4 : 12 / DataProjects.data.length} sm={6} xs={12}>
                        <ItemProyect title={item.title} imageUrl={item.imageUrl} technology={item.technology} subtitle={item.subtitle} linkUrlProyect={item.linkUrlProyect} gitHubRepositoryLink={item.gitHubRepositoryLink} />
                    </Grid>
                })
            }
        </Grid>
    );
}