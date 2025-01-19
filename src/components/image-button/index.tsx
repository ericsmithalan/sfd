import clsx from "clsx";
import { createRef, FC, MouseEvent, ReactNode, Ref } from "react";
import { BgImage } from "../bg-image";
import "./style.scss";

type ImageButtonProps = {
    children?: ReactNode;
    className?: string;
    disable?: boolean;
    active?: boolean;
    text?: string;
    image?: string;
    ref?: Ref<HTMLButtonElement>;
    onClick?: (e: MouseEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseOut?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
};

export const ImageButton: FC<ImageButtonProps> = ({
    children,
    disable = false,
    active = false,
    className,
    ref,
    image,
    onMouseOut,
    onMouseOver,
    onMouseEnter,
    onClick,
}) => {
    const buttonRef = ref || createRef();

    return (
        <button
            ref={buttonRef}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            className={clsx("image-button", disable && "disabled", active && "active", className)}
        >
            {image && <BgImage height={40} width={"100%"} src={image} />}

            {children}
        </button>
    );
};
