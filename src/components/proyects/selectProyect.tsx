import { useSettings } from "@/hooks/settingsContext";
import { ItemProyectInputType, MyProyectsTabEnum, Technologies } from "@/utils/types"
import { Box, Button, ButtonGroup, Card, CardMedia, Grid, List, ListItemButton, ListItemText, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import proyectsCss from '../../styles/proyects.module.css';
import { ButtonItemProyect, ItemProyect } from "../custom/itemProyect";
import { motion } from "framer-motion";
import { ButtonSimple } from "../custom/buttonSimple";
import WebIcon from '/public/svg/tecnnologies/web_icon.svg';
import GitHub from '/public/svg/redirecIcons/github.svg';


export const SelectProyects = ({ data, tabSelected, isChangeTab }: { data: ItemProyectInputType[], tabSelected: MyProyectsTabEnum, isChangeTab: boolean }) => {

    const [selectedData, setSelectedData] = useState<ItemProyectInputType | null>(null);
    const [arrayFilterData, setArrayFilterData] = useState<ItemProyectInputType[]>([]);
    const [valueMoveCards, setValueMoveCards] = useState<number>(0);
    const [durationTransition, setDurationTransition] = useState<number>(2);
    const [opdacity, setOpacity] = useState<number>(1);
    const [cardOpacity, setCardOpacity] = useState<number>(1);

    const { isSmallScreen, isDarkMode, isSpanish, width } = useSettings();

    const theme = useTheme();

    const darkOrLigth = isDarkMode ? 255 : 0;

    useEffect(() => {
        setOpacity(isChangeTab ? 0 : 1);
        setCardOpacity(isChangeTab ? 0 : 1);
        setDurationTransition(0.4);
    }, [isChangeTab]);

    useEffect(() => {
        const proyectsFilter = data.filter((item: ItemProyectInputType) => item.type === tabSelected);
        setArrayFilterData(proyectsFilter);
        setSelectedData(proyectsFilter[0]);
    }, [tabSelected]);


    const changeData = (selectedData: ItemProyectInputType) => {
        setCardOpacity(0);
        setTimeout(() => {
            setSelectedData(selectedData);
            setCardOpacity(1);
        }, 800);
    }

    function RedirectLink(url: string) {
        window.open(url);
    };

    return (
        <Grid container>
            <Grid item md={3}>
                <motion.div
                    animate={{ x: -valueMoveCards, opacity: opdacity, transition: { duration: durationTransition } }}
                    initial={{ x: -100, opacity: 0 }}>

                    {!isSmallScreen ?
                        <List className={proyectsCss.scrollableContent} sx={{ borderRight: 1 }}>
                            {
                                arrayFilterData.map((item: ItemProyectInputType, index: number) => {
                                    return (
                                        <ListItemButton key={`arrayFilterData${item.title}${index}`} onClick={() => changeData(item)} sx={{ marginY: 1, borderRadius: 3, transition: '0.7s ease', backgroundColor: selectedData?.title === item.title ? `rgba(${darkOrLigth}, ${darkOrLigth}, ${darkOrLigth}, 0.1)` : 'transparent' }}>
                                            <Typography color={selectedData?.title === item.title ? theme.palette.primary.main : theme.palette.text.primary}>{item.title}</Typography>
                                        </ListItemButton>
                                    );
                                })
                            }
                        </List>

                        : <Tabs variant="scrollable" scrollButtons="auto" sx={{ width: width * 0.8, overflow: 'auto', marginBottom: 2, backdropFilter: 'blur(10px)', backgroundColor: `rgba(${isDarkMode ? 255 : 0},${isDarkMode ? 255 : 0},${isDarkMode ? 255 : 0},${isDarkMode ? 0.05 : 0.1})`, borderRadius: 4, border: `1px ${theme.palette.primary.main} solid` }}>
                            {
                                arrayFilterData.map((item: ItemProyectInputType, index: number) => {
                                    return (
                                        <Tab key={`arrayFilterData${item.title}${index}`} onClick={() => changeData(item)} sx={{ marginY: 1, borderRadius: 3, transition: '0.7s ease', backgroundColor: selectedData?.title === item.title ? `rgba(${darkOrLigth}, ${darkOrLigth}, ${darkOrLigth}, 0.1)` : 'transparent', color: selectedData?.title === item.title ? theme.palette.primary.main : theme.palette.text.primary }} label={item.title}
                                        />

                                    );
                                })
                            }
                        </Tabs>
                    }
                </motion.div>
            </Grid>
            <Grid item md={9} paddingLeft={2} sx={{ height: '300px' }}>
                <motion.div
                    style={{ height: '300px', backgroundColor: theme.palette.background.default, borderRadius: '5px' }}
                    animate={{ x: valueMoveCards, opacity: cardOpacity, transition: { duration: durationTransition } }}
                    initial={{ x: 100, opacity: 0 }}>

                    {!isSmallScreen ?
                        <Grid container paddingX={2} paddingY={3} sx={{ height: '100%', border: '1px rgb(60, 60, 60) solid', borderRadius: 5 }}>
                            <Grid item md={8}>
                                <Stack justifyContent={'space-between'} sx={{ width: '100%', height: '100%' }}>
                                    <Stack direction={'row'} justifyContent={'space-between'}>

                                        <Typography variant="h5" color="primary" width={'80%'}>
                                            {selectedData?.title}
                                        </Typography>
                                        <Stack direction={'row'} width={'20%'}>
                                        {selectedData?.gitHubRepositoryLink &&
                                        <ButtonSimple
                                            styleMotionDiv={{ flex: 1, padding: 4, height: 40, width: 40, borderRadius: 20, paddingInline: 5.5, border: ` 1px ${theme.palette.cardProyect.main} solid` }}
                                            onClick={() => RedirectLink(selectedData?.gitHubRepositoryLink ?? '')}
                                        ><GitHub style={{ fill: theme.palette.cardProyect.main, height: '100%', width: '100%' }} /></ButtonSimple>}
                                        {selectedData?.linkUrlProyect &&
                                        <ButtonSimple
                                            styleMotionDiv={{ flex: 1, padding: 4, height: 40, width: 40, borderRadius: 20, paddingInline: 5.5, border: ` 1px ${isDarkMode ? theme.palette.primary.main : theme.palette.cardProyect.main} solid` }}
                                            onClick={() => RedirectLink(selectedData?.linkUrlProyect ?? '')}
                                        ><WebIcon style={{ fill: isDarkMode ? theme.palette.primary.main : theme.palette.cardProyect.main, height: '100%', width: '100%' }} /></ButtonSimple>}
                                        </Stack>
                                        
                                    </Stack>
                                    <Typography color={theme.palette.text.disabled}>
                                        {selectedData?.subtitle}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginY: 1.5 }}>
                                        {isSpanish ? selectedData?.description_es : selectedData?.description_en}
                                    </Typography>
                                    {
                                        selectedData?.technology &&
                                        <Stack direction={'row'} sx={{ width: '100%', overflow: 'auto' }}>
                                            {selectedData?.technology.map((item: Technologies, index: number) => {
                                                return (
                                                    <Box key={'ItemProyectTechnologies' + index} sx={{ height: 55, width: 50 }} >
                                                        <ButtonItemProyect
                                                            styleMotionDiv={{ backgroundColor: isDarkMode ? theme.palette.text.secondary : 'rgba(0,0,0,0.8)' }}
                                                            iconsEnum={item.iconSelected} />
                                                    </Box>
                                                )
                                            })}
                                        </Stack>
                                    }
                                </Stack>
                            </Grid>
                            <Grid item md={4}>
                                <Card>
                                    {selectedData &&
                                        <CardMedia
                                            component="img"
                                            image={selectedData.imageUrl}>
                                        </CardMedia>
                                    }
                                </Card>
                            </Grid>
                        </Grid>


                        : <ItemProyect subtitle={selectedData?.subtitle} linkUrlProyect={selectedData?.linkUrlProyect} imageUrl={selectedData?.imageUrl} title={selectedData?.title} technology={selectedData?.technology} gitHubRepositoryLink={selectedData?.gitHubRepositoryLink} />}
                </motion.div>

            </Grid>
        </Grid>
    )
}                       