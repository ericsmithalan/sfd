import React, { ReactElement } from "react";

export interface IconProps {
    fill?: boolean;
    width?: number | string;
    height?: number | string;
    color?: string;
    children?: React.ReactNode;
    className?: string;
}

export const defaultColor = "#CEAF86";

export const IconBase = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            className={props.className}
        >
            {props.children}
        </svg>
    );
};
