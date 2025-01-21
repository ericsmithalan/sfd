import clsx from "clsx";
import { createRef, FC, MouseEvent, Ref } from "react";
import { ColorRepresentation } from "three";
import { BgImage } from "../../bg-image";
import "./style.scss";

type TextureButtonProps = {
    className?: string;
    disable?: boolean;
    active?: boolean;
    color?: ColorRepresentation;
    text?: string;
    image?: string;
    ref?: Ref<HTMLButtonElement>;
    onClick?: (e: MouseEvent) => void;
};

export const TextureButton: FC<TextureButtonProps> = ({
    disable = false,
    text,
    active = false,
    className,
    color,
    ref,
    image,
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
            className={clsx(
                "button texture-button",
                disable && "disabled",
                active && "active",
                className,
            )}
        >
            {image && <BgImage src={image} />}
            {color && (
                <div
                    className={clsx("color", color)}
                    style={{ backgroundColor: String(color) }}
                ></div>
            )}
            {text && <div className="text">{text}</div>}
        </button>
    );
};
