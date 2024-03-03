import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { ItemProyect } from "./itemProyect";
import DataProjects from "../../data/proyects.data.json";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSettings } from "@/hooks/settingsContext";
import { ArrayMyProyectsTabEnum, ItemProyectInputType, MyProyectsTabEnum } from "@/utils/types";
import { SelectProyects } from "../proyects/selectProyect";

export const MyProjects = () => {
    const { t } = useTranslation();
    const { isDarkMode } = useSettings();

    const [tabValue, setTabValue] = useState<number>(0);
    const [tabSelected, setTabSelected] = useState<MyProyectsTabEnum>(ArrayMyProyectsTabEnum[0]);
    const [changeTab, setChangeTab] = useState<boolean>(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setChangeTab(true);
        setTimeout(() => {
            setTabSelected(ArrayMyProyectsTabEnum[newValue]);
            setChangeTab(false);
        }, 500);
    };


    return (
        <Grid container columnSpacing={2} rowSpacing={5}>
            <Grid item md={12} sm={12} xs={12}>
                <motion.div
                    animate={{ x: 0, opacity: 1, transition: { duration: 2 } }}
                    initial={{ x: -100, opacity: 0 }}>
                    <Typography id="proyects" variant="h4"> {t('proyects.text')} </Typography>
                </motion.div>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <motion.div
                    animate={{ x: 0, opacity: 1, transition: { duration: 2 } }}
                    initial={{ x: 100, opacity: 0 }}>
                    <Tabs value={tabValue} onChange={handleChange} textColor="primary" sx={{ backdropFilter: 'blur(10px)', backgroundColor: `rgba(${isDarkMode ? 255 : 0},${isDarkMode ? 255 : 0},${isDarkMode ? 255 : 0},${isDarkMode ? 0.05 : 0.1})`, borderRadius: 4 }}>
                        <Tab label={t('proyects.items.jobs')} />
                        <Tab label={t('proyects.items.own_proyects')} />
                    </Tabs>
                </motion.div>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <SelectProyects data={DataProjects.data} tabSelected={tabSelected} isChangeTab={changeTab} />
            </Grid>
        </Grid>
    );
}