import { ReactNode } from "react";
import { DirectionRow } from "../helpers/grid.Calculate";
import { enumDirecctionColumn } from "../class";

export type ContainerTimeLineType = {
    customContainer?: ReactNode;
    containerStyle?: React.CSSProperties;
    children?: ReactNode;
}


export type TimeLineInput = {
    maxItemsPerRow?: number;
    data: { title: string }[];
    connect90Degrees?:boolean;
    startTimeLine?: DirectionRow;
    direcctionColumn?: enumDirecctionColumn;
    isContinue?:boolean;
}