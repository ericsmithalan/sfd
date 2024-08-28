"use client";
export interface ModelProps {
    className?: string;
}
import { useEffect, useRef } from "react";
import { Flex } from "../flex";
import classNames from "classnames";

import { ModelViewerElement } from "@google/model-viewer";
import "./style.scss";
export const Model = ({ className }: ModelProps) => {
    const modelRef = useRef<ModelViewerElement>(null);

    useEffect(() => {
        import("@google/model-viewer");
        const el = modelRef.current;

        if (el) {
            const onProgress = (event: any) => {
                const progressBar = event.target.querySelector(".progress-bar");
                const updatingBar = event.target.querySelector(".update-bar");

                updatingBar.style.width = `${
                    event.detail.totalProgress * 100
                }%`;

                console.log(event.detail.totalProgress);

                if (event.detail.totalProgress === 1) {
                    progressBar.classList.add("hide");
                    event.target.removeEventListener("progress", onProgress);
                } else {
                    progressBar.classList.remove("hide");
                }
            };

            el.addEventListener("progress", onProgress);

            return () => {
                el.removeEventListener("progress", onProgress);
            };
        }
    }, [modelRef]);

    return (
        <Flex
            as="div"
            full="both"
            id="card"
            className={classNames(
                "min-h-screen relative min-w-[100vw]",
                className
            )}
        >
            <model-viewer
                ref={modelRef}
                src="/models/bunkbed-pre-design.glb"
                camera-controls
                shadow-intensity="1.12"
                environment-image="legacy"
                camera-orbit="-247.4deg 80.79deg 13.73m"
                field-of-view="26.33deg"
                auto-rotate
            >
                <div className="progress-bar hide" slot="progress-bar">
                    <div className="update-bar"></div>
                </div>
            </model-viewer>
        </Flex>
    );
};
