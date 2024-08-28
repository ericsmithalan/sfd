"use client";
export interface ModelProps {
    className?: string;
    modelPath?: string;
}
import { useEffect } from "react";
import { Flex } from "../flex";
import classNames from "classnames";

import { ModelViewerElement } from "@google/model-viewer";
import "./style.scss";

export const Model = ({ className, modelPath }: ModelProps) => {
    useEffect(() => {
        import("@google/model-viewer");
    }, []);

    return (
        <Flex
            as="div"
            full="both"
            id="card"
            className={classNames(
                "min-h-screen relative z-1 min-w-[100vw]",
                className
            )}
        >
            <model-viewer
                src={modelPath}
                camera-controls
                shadow-intensity="1.12"
                environment-image="legacy"
                camera-orbit="-247.4deg 80.79deg 13.73m"
                field-of-view="26.33deg"
                auto-rotate
            ></model-viewer>
        </Flex>
    );
};
