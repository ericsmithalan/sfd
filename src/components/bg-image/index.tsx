import clsx from "clsx";
import React, { FC } from "react";
import "./style.scss";

type BgImageProps = {
    src: string | null;
    className?: string;
    size?: "contain" | "cover";
    title?: string;
    children?: React.ReactNode;
    height?: number | string;
    width?: number | string;
    opacity?: number;
    onClick?: (evt: React.MouseEvent) => void;
};

export const BgImage: FC<BgImageProps> = ({
    src,
    className,
    size = "contain",
    title,
    children,
    height,
    width,
    onClick,
}: BgImageProps) => {
    return (
        <div
            className={clsx("bg-image", className)}
            style={{ height: height, width: width }}
            title={title}
            onClick={onClick}
        >
            <div
                className={clsx("background")}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: size,
                    height: height,
                    width: width,
                }}
            >
                {children}
            </div>
        </div>
    );
};
