import React, { ReactNode } from "react";
import { GridDirecctionTimeLineSnake, enumDirecctionColumn } from "../class";

export enum DirectionRow {
    leftToRigth = 'leftToRigth',
    rigthToLeft = 'rigthToLeft',
}

export enum GridDirectionEnum {
    leftToRigth = 'leftToRigth',
    rigthToLeft = 'rigthToLeft',
    topToDown = 'topToDown',
    downToUp = 'downToUp',
    leftToDown = 'leftToDown',
    leftToUp = 'leftToUp',
    rigthToUp = 'rigthToUp',
    rigthToDown = 'rigthToDown'
}

export type RowData = {
    element: any,
    arrowDirecction: GridDirectionEnum,
    lastIndex: boolean,
    isNull: boolean
};

export type GridCalculateReturnData = {
    directionRow: DirectionRow,
    row: RowData[];
}

export function GridCalculate(items: ReactNode[], maxItemsPerRow?: number, startTimeline?: DirectionRow, direcctionColumn?: enumDirecctionColumn): GridCalculateReturnData[] {

    const gridData = new GridDirecctionTimeLineSnake(direcctionColumn ?? enumDirecctionColumn.endToStart, startTimeline ?? DirectionRow.leftToRigth);

    let itemPerRow: number = maxItemsPerRow ?? 1;

    if (!maxItemsPerRow) {
        if (items.length <= 6) {
            itemPerRow = items.length;
        } else {
            itemPerRow = 6;
        }
    }

    let currentIndex: number = 0;

    items.forEach((item, index) => {
        gridData.arrowDirecction = GridDirectionEnum.leftToRigth

        if (currentIndex >= (itemPerRow - 1) || index == (items.length - 1)) {
            gridData.putArrowCorner();
        }

        gridData.pushRowData(item, index == (items.length - 1), false);
        if (index == (items.length - 1) && itemPerRow != gridData.currentRowLength) {
            for (let sumEmptyItems = 0; sumEmptyItems <= (itemPerRow - gridData.currentRowLength); sumEmptyItems++) {
                gridData.pushRowData('null', false, true);
            }
        }
        if (currentIndex >= (itemPerRow - 1) || index === items.length - 1) {

            currentIndex = 0
            gridData.pushData();

            gridData.changeRowDirection();

        } else {
            currentIndex += 1;
        }
    });

    return gridData.gridDirecctionData;
}