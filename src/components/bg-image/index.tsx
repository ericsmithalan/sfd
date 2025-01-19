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
    minHeight?: number | string;
    maxHeight?: number | string;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    opacity?: number;
    onClick?: (evt: React.MouseEvent) => void;
};

export const BgImage: FC<BgImageProps> = ({
    src,
    className,
    size = "cover",
    title,
    children,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    width,
    onClick,
}: BgImageProps) => {
    return (
        <div
            className={clsx("bg-image", className)}
            style={{
                height: height || "100%",
                width: width || "100%",
                minWidth: minWidth,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                minHeight: minHeight,
            }}
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
