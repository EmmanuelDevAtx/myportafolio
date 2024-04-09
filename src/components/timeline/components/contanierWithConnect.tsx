import { DirectionRow, GridDirectionEnum, RowData } from "../helpers/grid.Calculate";
import { ConnectContainer } from "./connectContainers";
import { ContainerItem, LastContainerItem } from "./containerItem";

export const ContainerWithConnect = ({ title, arrowDirecction, directionRow, key, isContinue, lastIndex, maxItemsPerRow, isPhatom }: RowData & { key: string, directionRow: DirectionRow, isContinue?: boolean, maxItemsPerRow: number, isPhatom: boolean }) => {
    if (isPhatom) {
        return (
            <div key={key} style={{ display: 'flex', }}>
                <div style={{ flex: 1 }} />
                <div style={{ flex: 1 }} />
            </div>
        )
    }
    if (lastIndex && !isContinue) {
        return (
            <div key={key} style={{ display: 'flex', }}>
                {directionRow === DirectionRow.rigthToLeft &&
                    <div style={{ flex: 1 }} />
                }

                <div style={{ flex: 1 }}>
                    <LastContainerItem children={title} />
                </div>

                {directionRow === DirectionRow.leftToRigth &&
                    <div style={{ flex: 1 }} />
                }
            </div>
        );
    }

    if (directionRow === DirectionRow.leftToRigth) {
        return (
            <div key={key} style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <ContainerItem children={title} />
                </div>
                <div style={{ flex: 1, display: 'flex' }}>
                    <ConnectContainer arrowDirecction={arrowDirecction} />
                </div>
            </div>


        );
    } else {
        return (
            <div key={key} style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
                    <ConnectContainer arrowDirecction={arrowDirecction} />
                </div>
                <div style={{ flex: 1 }} >
                    <ContainerItem children={title} />
                </div>
            </div>
        );
    }
}