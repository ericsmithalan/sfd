import { FC } from "react";
import "./style.scss";

type LoadingProps = {
    message: string;
};

export const Loading: FC<LoadingProps> = ({ message }) => {
    return (
        <div className="loading">
            <div className="content">{message}</div>
        </div>
    );
};
