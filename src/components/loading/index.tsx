import clsx from "clsx";
import { FC } from "react";
import { createPortal } from "react-dom";
import "./style.scss";

type LoadingProps = {
    className?: string;
    message: string;
};

export const Loading: FC<LoadingProps> = ({ message, className }) => {
    return createPortal(
        <div className={clsx("loading", className)}>
            <div className="content">
                <div className="text">{message}</div>
                <div className="loader"></div>
            </div>
        </div>,
        document.body,
    );
};
