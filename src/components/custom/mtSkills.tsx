import Image from 'next/image';
import Css from '../../styles/myskills.module.css';
import { Card, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type SkillDatatype = {
    url: string,
    text: string;
}
const skillsData: SkillDatatype[] = [
    { url: "/svg/myskills/blockchain.svg", text:"Blockchain" },
    { url: "/svg/myskills/react.svg", text:"React" },
    { url: "/svg/myskills/react.svg", text:"React Native" },
    { url: "/svg/myskills/mongodb.svg", text:"Mongo DB" },
    { url: "/svg/myskills/next-js.svg", text:"Next js" },
    { url: "/svg/myskills/nodejs.svg", text:"Node js" },
    { url: "/svg/myskills/typescript.svg", text:"TypeScript" },

    { url: "/svg/myskills/blockchain.svg", text:"Blockchain" },
    { url: "/svg/myskills/react.svg", text:"React" },
    { url: "/svg/myskills/react.svg", text:"React Native" },
    { url: "/svg/myskills/mongodb.svg", text:"Mongo DB" },
    { url: "/svg/myskills/next-js.svg", text:"Next js" },
    { url: "/svg/myskills/nodejs.svg", text:"Node js" },
    { url: "/svg/myskills/typescript.svg", text:"TypeScript" },

    { url: "/svg/myskills/blockchain.svg", text:"Blockchain" },
    { url: "/svg/myskills/react.svg", text:"React" },
    { url: "/svg/myskills/react.svg", text:"React Native" },
]

export const MySkills = () => {
    return (
        <div className={Css.slider}>
            <div className={Css.sliderTrack}>
                {
                    skillsData.map((item: SkillDatatype, index: number) => {
                        return <MinCardSkillData 
                        key={index + item.text} 
                        url={item.url} 
                        name={item.text} />
                    })
                }
            </div>
        </div>
    );
}

const MinCardSkillData = ({ key, url, name }: { key: string, url: string, name: string }) => {
    return (
        <motion.div
            key={key}
            animate={{ scale: [0.7, 1, 0.7] }}
            //TODO: This need to add infinte loop and 
            // escale when the icon stay in the center of the screen
            transition={{ ease: "linear", duration: 4,}}
        >
            <Card className={Css.slide} sx={{ borderRadius: 5 , padding:3}}>
                <Stack textAlign={'center'} justifyItems={'center'}>
                    <Image height={100} width={100} src={url} alt={name} />
                    <Typography> {name}</Typography>
                </Stack>
            </Card>
        </motion.div>
    );
}