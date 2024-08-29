import classNames from "classnames";
import "./style.scss";

export type IconSize = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
export type IconNames =
    | "blade"
    | "email"
    | "phone"
    | "menu"
    | "close"
    | "location";

export interface IconProps {
    fill?: boolean;
    color?: string;
    children?: React.ReactNode;
    className?: string;
    iconSize?: IconSize;
    icon: IconNames;
    title: string;
}

export const defaultColor = "#CEAF86";

export interface IconSizeStyle {
    width: number;
    height: number;
    cssClass: string;
}

export const getIconSizeStyle = (size?: IconSize): IconSizeStyle => {
    const iconSize: Record<string, number> = {
        sm: 18,
        md: 20,
        lg: 24,
        xl: 26,
        xxl: 32,
        xxxl: 40,
    };

    if (!size) {
        return {
            width: 24,
            height: 24,
            cssClass: `w-[24px] h-[24px]`,
        };
    }

    return {
        width: iconSize[size],
        height: iconSize[size],
        cssClass: `w-[${iconSize[size || 24]}px] h-[${iconSize[size]}px]`,
    };
};

export const Icon = ({
    icon,
    iconSize,
    className,
    title,
    color,
}: IconProps) => {
    const { width, height, cssClass } = getIconSizeStyle(iconSize);

    return (
        <div
            title={title}
            className={classNames("img-icon", "", cssClass, className)}
            style={{
                maskImage: `url(/images/icons/${icon}.svg)`,
                WebkitMaskImage: `url(/images/icons/${icon}.svg)`,
                backgroundColor: color || "#CEAF86",
                width: width,
                height: height,
            }}
        />
    );
};
