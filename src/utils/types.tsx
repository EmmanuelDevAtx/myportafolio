import { IconsEnum } from "@/components/svgIcons/icons";

export enum MyProyectsTabEnum {
    WORKS = 'WORKS',
    OWN_PROYECTS = 'OWN_PROYECTS'
}

export const ArrayMyProyectsTabEnum = [
    MyProyectsTabEnum.WORKS,
    MyProyectsTabEnum.OWN_PROYECTS
]

export type Technologies = {
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
    type?: string;
    description_es?:string;
    description_en?:string;
}