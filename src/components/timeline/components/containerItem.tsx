import React from "react";
import { ContainerTimeLineType } from "../types";

export const ContainerItem = ({ customContainer, containerStyle, children }: ContainerTimeLineType) => {

    if (customContainer) {
        return customContainer;
    }

    return (
            <div className="conatiner">{children}</div>
    );
}

export const LastContainerItem = ({ customContainer, containerStyle, children }: ContainerTimeLineType) => {

    if (customContainer) {
        return customContainer;
    }

    return (
            <div className="last-item-conatiner">{children}</div>
    );
}