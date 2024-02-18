import { MotionStyle, VariantLabels, motion } from "framer-motion";
import React from "react";

type GenericProps = {
    scale?: number;
    opacity?: number;
    rotate?: number;
}

type ButtonSimpleType = {
    children: React.ReactNode | JSX.Element;
    styleMotionDiv?: MotionStyle;
    initial?: GenericProps
    whileHover?: GenericProps
    whileTap?: GenericProps
    onClick?: () => void;
    key?: string;
}

export const ButtonSimple = ({ children, initial, whileHover, whileTap, onClick, styleMotionDiv, key }: ButtonSimpleType) => {
    return (
        <motion.div
            key={key}
            onClick={onClick}
            initial={{ scale: 0.9, ...initial }}
            whileHover={{ scale: 1, ...whileHover }}
            whileTap={{ scale: 0.8, ...whileTap }}
            style={{ flex: 1, ...styleMotionDiv }}>
            {children}
        </motion.div>
    );
}