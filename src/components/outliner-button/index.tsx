import clsx from "clsx";
import { MouseEvent, useState } from "react";
import { IconName } from "../../types";
import { Button } from "../button";
import "./style.scss";

type OutlinerButtonProps = {
    id?: string;
    className?: string;
    active?: boolean;
    text?: string;
    icon?: IconName;
    onClick?: (e: MouseEvent) => void;
    onVisible?: (visible: boolean, e: MouseEvent) => void;
};

export const OutlinerButton = ({
    id,
    text,
    active,
    onClick,
    onVisible,
    className,
    icon,
}: OutlinerButtonProps) => {
    const [visible, setVisible] = useState(true);

    return (
        <div id={id} className={clsx("outliner-button")}>
            <Button
                title={text}
                variant="outliner"
                active={active}
                icon={(icon && icon) || "blender"}
                text={text}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e);
                    }
                }}
            />
            <Button
                className="visible-btn"
                title={"Toggle Visibility"}
                variant="outliner"
                onClick={(e) => {
                    e.stopPropagation();
                    setVisible(!visible);
                    if (onVisible) {
                        onVisible(!visible, e);
                    }
                }}
                icon={visible ? "eye" : "eye-close"}
            />
        </div>
    );
};
