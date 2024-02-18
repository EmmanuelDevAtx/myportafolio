import Image from 'next/image';
import Css from '../../styles/myskills.module.css';
import { Card, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSettings } from '@/hooks/settingsContext';

type SkillDatatype = {
    url: string,
    text: string;
}
const skillsData: SkillDatatype[] = [
    { url: "/svg/myskills/blockchain.svg", text: "Blockchain" },
    { url: "/svg/myskills/react.svg", text: "React" },
    { url: "/svg/myskills/react.svg", text: "React Native" },
    { url: "/svg/myskills/mongodb.svg", text: "Mongo DB" },
    { url: "/svg/myskills/next-js.svg", text: "Next js" },
    { url: "/svg/myskills/nodejs.svg", text: "Node js" },
    { url: "/svg/myskills/typescript.svg", text: "TypeScript" }
]
skillsData.push(...skillsData);

export const MySkills = () => {
    const { width } = useSettings();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 4, }}
        >
            <div className={Css.slider} style={{ maxWidth:width}}>
                <div className={Css.sliderTrack}>
                    {
                        skillsData.map((item: SkillDatatype, index: number) => {
                            return <MinCardSkillData
                                id={index + item.url}
                                key={index + item.text}
                                url={item.url}
                                name={item.text} />
                        })
                    }
                </div>
            </div>
        </motion.div>
    );
}

const MinCardSkillData = ({ id, url, name }: { id:string, url: string, name: string }) => {
    const [scale, setScale] = useState<number>(0.7);
    const { width } = useSettings();
    console.log('width ', width)
      const handleScroll = () => {
        const element = document.getElementById(id);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const windowCenterX = window.innerWidth / 1.7;

            const marginError = 200;
            if (Math.abs(elementCenterX - windowCenterX) < marginError) {
                setScale(1);
            } else {
                setScale(0.7);

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
    // FIX: When return scroll, animation get max size too
    return (
        <motion.div
            id={id}
            className={`${Css.slide} ${Css.slider}`} // Agrega las clases necesarias
            initial={{ scale: 0.7}}
            animate={{ scale }}
            transition={{ ease: "easeInOut", duration: 8 }}
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