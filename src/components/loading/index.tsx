import clsx from "clsx";
import { FC } from "react";
import "./style.scss";

type LoadingProps = {
    className?: string;
    message: string;
};

export const Loading: FC<LoadingProps> = ({ message, className }) => {
    return (
        <div className={clsx("loading", className)}>
            <div className="content">
                <div className="text">{message}</div>
                <div className="loader"></div>
            </div>
        </div>
    );
};
