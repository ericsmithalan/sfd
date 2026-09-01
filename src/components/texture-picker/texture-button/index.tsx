import clsx from "clsx";
import { createRef, FC, MouseEvent, Ref } from "react";
import { BgImage } from "../../bg-image";
import "./style.scss";

type TextureButtonProps = {
    selected?: string;
    className?: string;
    disable?: boolean;
    isMobile?: boolean;
    active?: boolean;
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
    isMobile = false,
    ref,
    image,
    selected,
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
                isMobile && "mobile",
                className,
            )}
        >
            {image && <BgImage src={image} />}
            {text && (
                <div className="text">{!selected && selected !== "None" ? text : selected}</div>
            )}
        </button>
    );
};
