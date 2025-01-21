import { MouseEvent, useState } from "react";
import { Button } from "../button";
import "./style.scss";

type OutlinerButtonProps = {
    id?: string;
    active?: boolean;
    text?: string;
    onClick?: (e: MouseEvent) => void;
    onVisible?: (visible: boolean, e: MouseEvent) => void;
};

export const OutlinerButton = ({ id, text, active, onClick, onVisible }: OutlinerButtonProps) => {
    const [visible, setVisible] = useState(true);

    return (
        <Button
            className="outliner-button"
            id={`obj_${id}`}
            variant="outliner"
            active={active}
            icon="box-1"
            text={text}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
        >
            <Button
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
        </Button>
    );
};
