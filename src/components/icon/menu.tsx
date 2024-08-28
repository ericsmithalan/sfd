import { defaultColor, IconBase, IconProps } from "./icon";

export const MenuIcon = ({ fill, color, ...props }: IconProps) => {
    const fillColor = color || defaultColor;
    return (
        <IconBase>
            <path
                fill={fillColor}
                d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
            ></path>
        </IconBase>
    );
};
