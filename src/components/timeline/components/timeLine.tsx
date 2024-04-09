import { useEffect, useState } from 'react';
import { TimeLineInput } from '../types';
import { DirectionRow, GridCalculate, GridCalculateReturnData, GridDirectionEnum, RowData } from '../helpers/grid.Calculate';
import { ContainerWithConnect } from './contanierWithConnect';
import { ConnectContainer } from './connectContainers';

import '../styles/container.css';
import '../styles/grid.css';
import { enumDirecctionColumn } from '../class';

export const SnakeTimeLine = ({ maxItemsPerRow = 2, data, startTimeLine, direcctionColumn, isContinue }: TimeLineInput) => {
    const [dataTransformed, setDataTransformed] = useState<GridCalculateReturnData[]>([]);
    const itemsPerRow = (maxItemsPerRow < 2 ? 2 : maxItemsPerRow);
    useEffect(() => {   
        setDataTransformed(GridCalculate(data, itemsPerRow, startTimeLine, direcctionColumn));
    }, [maxItemsPerRow, data]);

    return (
        <div>
            {
                dataTransformed.map((gridItems: GridCalculateReturnData, index: number) => {
                    return (
                        <div key={'rowDirecction' + index} >
                            {index > 0 &&
                                <div style={{ display: 'flex', height: '100px', flexDirection: gridItems.directionRow == DirectionRow.rigthToLeft ? (direcctionColumn == enumDirecctionColumn.endToStart ? 'row-reverse':'row') : (direcctionColumn != enumDirecctionColumn.endToStart ? 'row-reverse':'row') }}>
                                    <div style={{ flex: (itemsPerRow * 2) - 1, }} />
                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', }}>
                                        <ConnectContainer arrowDirecction={direcctionColumn == enumDirecctionColumn.endToStart ? GridDirectionEnum.downToUp : GridDirectionEnum.topToDown} />
                                    </div>
                                </div>
                            }
                            <div style={{ display: 'flex' }}>
                                {
                                    gridItems.row.map((rowData) => {
                                        const data: RowData =rowData
                                        return (
                                            <div style={{ flex: itemsPerRow}}>
                                                <ContainerWithConnect maxItemsPerRow={itemsPerRow} isPhatom={rowData.isNull} isContinue={isContinue}  {...data} directionRow={gridItems.directionRow} key={'ContainerWithConnect ' + index}/>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }

        </div>
    );
}