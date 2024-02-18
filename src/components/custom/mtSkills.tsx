import Image from 'next/image';
import Css from '../../styles/myskills.module.css';
import { Card, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSettings } from '@/hooks/settingsContext';

type SkillDatatype = {
    id: number,
    url: string,
    text: string,
}

type SkillScale = {
    id: number,
    scale: number;
}
const skillsDataMain: (SkillDatatype & SkillScale)[] = [
    { id: 0, scale: 0.7, url: "/svg/myskills/blockchain.svg", text: "Blockchain" },
    { id: 1, scale: 0.7, url: "/svg/myskills/react.svg", text: "React" },
    { id: 2, scale: 0.7, url: "/svg/myskills/react.svg", text: "React Native" },
    { id: 3, scale: 0.7, url: "/svg/myskills/mongodb.svg", text: "Mongo DB" },
    { id: 4, scale: 0.7, url: "/svg/myskills/next-js.svg", text: "Next js" },
    { id: 5, scale: 0.7, url: "/svg/myskills/nodejs.svg", text: "Node js" },
    { id: 6, scale: 0.7, url: "/svg/myskills/typescript.svg", text: "TypeScript" }
]

let skillsData = ([...skillsDataMain, ...skillsDataMain, ...skillsDataMain, ...skillsDataMain]);

export const MySkills = () => {

    const [skillScale, setSkillScale] = useState<SkillScale[]>(skillsDataMain);
    const { width } = useSettings();
    function UpdateScale(newScale: number, id: number) {
        const currentScales = [...skillScale];
        currentScales[currentScales.findIndex((item) => item.id === id)].scale = newScale
        setSkillScale(currentScales);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 4, }}
        >
            <div className={Css.slider} style={{ maxWidth: width }}>
                <div className={Css.sliderTrack}>
                    {
                        skillsData.map((item: SkillDatatype, index: number) => {
                            return <MinCardSkillData
                                id={index + item.url}
                                key={index + item.text}
                                url={item.url}
                                name={item.text}
                                scale={skillScale.find((itemScale: SkillScale) => itemScale.id === item.id)?.scale}
                                UpdateScale={UpdateScale}
                                idItem={item.id} />
                        })
                    }
                </div>
            </div>
        </motion.div>
    );
}

const MinCardSkillData = ({ id, url, name, scale, UpdateScale, idItem }: { id: string, url: string, name: string, scale?: number, UpdateScale: (newScale: number, id: number) => void, idItem: number }) => {
    const handleScroll = () => {
        const element = document.getElementById(id);
        const { width } = useSettings();
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const windowCenterX =  width / 1.6;

            const margin = width* 0.20;

            if (elementCenterX > 0 && elementCenterX < width) {
                if (elementCenterX < windowCenterX - margin || elementCenterX > windowCenterX + margin) {
                    UpdateScale(0.7, idItem);
                } else {
                    UpdateScale(1, idItem);
                }
            }
        }
    };

    useEffect(() => {
        const intervalo = setInterval(() => {
            handleScroll();
        }, 500);
        return () => {
            clearInterval(intervalo);
        };
    }, []);


    return (
        <motion.div
            id={id}
            className={`${Css.slide} ${Css.slider}`}
            initial={{ scale: 0.7 }}
            animate={{ scale: scale ?? 0.7 }}
            transition={{ ease: "easeInOut", duration: window.innerWidth > 650 ? 10 : 2}}
        >
            <Card sx={{ borderRadius: 5, padding: 3 }}>
                <Stack textAlign={'center'} justifyItems={'center'}>
                    <Image height={100} width={100} src={url} alt={name} />
                    <Typography>{name}</Typography>
                </Stack>
            </Card>
        </motion.div>
    );
}