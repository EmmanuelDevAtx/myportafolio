import { Box, Card, CardContent, CardHeader, CardMedia, Grid, Stack, useTheme } from "@mui/material";
import Rive from "@rive-app/react-canvas";
import WebIcon from '/public/svg/tecnnologies/web_icon.svg';
import GitHub from '/public/svg/redirecIcons/github.svg';
import poryectsCSS from '../../styles/proyects.module.css';
import { useSettings } from "@/hooks/settingsContext";
import { ButtonSimple } from "./buttonSimple";
import { CustomIcon, IconsEnum  } from "../svgIcons/icons";

type Technologies = {
    iconSelected?: IconsEnum | string;
    openUrl?: string;
    customAction?: () => void;
}
export type ItemProyectInputType = {
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    technology?: Technologies[];
    linkUrlProyect?: string;
    gitHubRepositoryLink?: string;
}


export const ItemProyect = ({ subtitle, linkUrlProyect, imageUrl, title, technology, gitHubRepositoryLink }: ItemProyectInputType) => {
    
    const { isDarkMode } = useSettings();
    const theme = useTheme();

    function RedirectLink(url: string) {
        window.open(url);
    };
    
    return (
        <div className={poryectsCSS.cardBackgroundImage} style={{ backgroundImage: `url(${imageUrl})`}}>
            <Card className={poryectsCSS.cardProyects}>
                {
                    title &&
                    <CardHeader
                        titleTypographyProps={{ fontSize: 20, color:theme.palette.cardProyect.main }}
                        subheaderTypographyProps={{color:theme.palette.cardProyect.disable}}
                        title={title}
                        subheader={subtitle}
                        action={

                            <Stack direction={'row'}>
                                {gitHubRepositoryLink &&
                                    <ButtonSimple
                                        styleMotionDiv={{ flex: 1, padding: 4, height: 40, width: 40, borderRadius: 20, paddingInline: 5.5, border: ` 1px ${theme.palette.cardProyect.main} solid` }}
                                        onClick={() => RedirectLink(gitHubRepositoryLink)}
                                    ><GitHub style={{ fill: theme.palette.cardProyect.main, height: '100%', width: '100%' }} /></ButtonSimple>}
                                {linkUrlProyect &&
                                    <ButtonSimple
                                        styleMotionDiv={{ flex: 1, padding: 4, height: 40, width: 40, borderRadius: 20, paddingInline: 5.5, border: ` 1px ${isDarkMode ? theme.palette.primary.main : theme.palette.cardProyect.main} solid` }}
                                        onClick={() => RedirectLink(linkUrlProyect)}
                                    ><WebIcon style={{ fill: isDarkMode ? theme.palette.primary.main : theme.palette.cardProyect.main, height: '100%', width: '100%' }} /></ButtonSimple>}

                            </Stack>
                        }
                    />
                }
                <CardMedia>
                    {
                        imageUrl
                            ? <img src={imageUrl} alt={imageUrl} className={poryectsCSS.imageContainer} />
                            : <Rive
                                style={{ maxHeight: 250, height: '100%' }}
                                src="/rive/work.riv"
                                stateMachines="bumpy"
                            />
                    }
                </CardMedia>
                <CardContent sx={{ height: '100%', padding: 3, width: '100%' }}>
                    <Grid container justifyContent={'start'} >
                        {technology && technology?.length > 0 &&
                            technology.map((currentTechnology: Technologies, index: number) => {
                                return (
                                    <Grid item md={2} sm={2} xs={2}>
                                        <ButtonItemProyect key={currentTechnology?.iconSelected ?? 'ButomItem'} iconsEnum={currentTechnology?.iconSelected}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export const ButtonItemProyect = ({ iconsEnum, key }: {iconsEnum?: IconsEnum | string, key: string }) => {
    const theme = useTheme();
    const { isDarkMode } = useSettings();

    if(!iconsEnum) return <></>
    
    return (
        <ButtonSimple
            key={key}
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
            styleMotionDiv={{ flex: 1, padding: 4, height: '86%', borderRadius: 15, backgroundColor: isDarkMode ? theme.palette.text.secondary : 'transparent', border: `1px ${theme.palette.cardProyect.main} solid` }}
        >
            {CustomIcon(iconsEnum,theme.palette.background.default, '100%', '100%', theme.palette.text.primary)}
        </ButtonSimple>
    );
}