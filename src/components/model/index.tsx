"use client";
export interface ModelProps {
    className?: string;
    modelPath?: string;
}
import { Suspense, useEffect, useRef, useState } from "react";
import { Flex } from "../flex";
import classNames from "classnames";

import { ModelViewerElement } from "@google/model-viewer";
import "./style.scss";
import { Loading } from "../loading";

export const Model = ({ className, modelPath }: ModelProps) => {
    const [loading, setLoading] = useState(true);
    const viewerRef = useRef<ModelViewerElement>(null);

    useEffect(() => {
        import("@google/model-viewer");
        const progressBar = viewerRef.current;

        const onLoad = (e: any) => {
            setLoading(false);
        };

        if (progressBar) {
            progressBar.addEventListener("load", onLoad);
        }

        return () => {
            progressBar?.removeEventListener("load", onLoad);
        };
    }, [viewerRef]);

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
            <Loading className="fixed" loading={loading} />

            <model-viewer
                // reveal="manual"
                ref={viewerRef}
                // loading="auto"
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
