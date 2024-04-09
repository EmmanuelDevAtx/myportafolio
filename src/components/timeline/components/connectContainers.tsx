import { GridDirectionEnum } from "../helpers/grid.Calculate";

export const ConnectContainer = ({ arrowDirecction }: { arrowDirecction: GridDirectionEnum }) => {

    let className = "connect-horizontal";

    switch (arrowDirecction) {
        case GridDirectionEnum.leftToRigth:
            className = "connect-horizontal"
            break;
        case GridDirectionEnum.rigthToLeft:
            className = "connect-horizontal"
            break;
        case GridDirectionEnum.topToDown:
            className = "connect-vertical"
            break;
        case GridDirectionEnum.downToUp:
            className = "connect-vertical"
            break;
        case GridDirectionEnum.leftToDown:
            className = "connect-left-to-down"
            break;
        case GridDirectionEnum.leftToUp:
            className = "connect-left-to-up"
            break;
        case GridDirectionEnum.rigthToUp:
            className = "connect-rigth-to-up"
            break;
        case GridDirectionEnum.rigthToDown:
            className = "connect-rigth-to-down"
            break;
    }

    return (
        <div className={className} />
    );
}