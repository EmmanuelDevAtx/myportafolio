import { ReactNode } from "react";
import { DirectionRow, GridCalculateReturnData, GridDirectionEnum, RowData } from "../helpers/grid.Calculate";

export enum enumDirecctionColumn {
    endToStart = 'endToStart',
    startToEnd = 'startToEnd'
}
export interface GridDataInterface {
    pushData: (data: any) => void;
    removeData: () => void;
}

export class GridDirecctionTimeLineSnake implements GridDataInterface {

    /**
     * This private variables are for know about how the direction abuot the colum 
     * and the row, how it goning to distribute the data
     */
    private _direcctionColumn: enumDirecctionColumn;
    private _directionRow: DirectionRow;
    private _arrowDirecction: GridDirectionEnum = GridDirectionEnum.leftToRigth;

    private _rowCurrentData: RowData[] = [];
    private _gridDirecctionData: GridCalculateReturnData[] = [];

    constructor(direcctionColumn: enumDirecctionColumn, direcctionRow: DirectionRow) {
        this._direcctionColumn = direcctionColumn;
        this._directionRow = direcctionRow;
    }

    pushData(): void {
        this._direcctionColumn == enumDirecctionColumn.startToEnd
            ? this._gridDirecctionData.push({ directionRow: this._directionRow, row: this._rowCurrentData })
            : this._gridDirecctionData.unshift({ directionRow: this._directionRow, row: this._rowCurrentData });
        this.cleanRow();
    }

    removeData(): void {

    }

    changeRowDirection() {
        this._directionRow == DirectionRow.leftToRigth
            ? this._directionRow = DirectionRow.rigthToLeft
            : this._directionRow = DirectionRow.leftToRigth
    }

    pushRowData(data: ReactNode, lastIndex: boolean, isNull: boolean) {

        let dataToPush: RowData;

        dataToPush = { element: data, arrowDirecction: this._arrowDirecction, lastIndex, isNull }

        if (this._directionRow == DirectionRow.leftToRigth) {
            this._rowCurrentData.push(dataToPush);
        } else {
            this._rowCurrentData.unshift(dataToPush);
        }
    }

    putArrowCorner() {
        if (this._direcctionColumn == enumDirecctionColumn.startToEnd) {
            this._directionRow == DirectionRow.leftToRigth
                ? this._arrowDirecction = GridDirectionEnum.leftToDown
                : this._arrowDirecction = GridDirectionEnum.rigthToDown

        } else {
            this._directionRow == DirectionRow.leftToRigth
                ? this._arrowDirecction = GridDirectionEnum.leftToUp
                : this._arrowDirecction = GridDirectionEnum.rigthToUp
        }
    }

    private cleanRow() {
        this._rowCurrentData = [];
    }

    set arrowDirecction(arrowDirecction: GridDirectionEnum) {
        this._arrowDirecction = arrowDirecction;
    }

    get gridDirecctionData(): GridCalculateReturnData[] {
        return this._gridDirecctionData
    }

    get currentRowLength(): number {
        return this._rowCurrentData.length
    }
}