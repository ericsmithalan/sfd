"use client";
export interface ModelProps {
    className?: string;
    modelPath?: string;
    poster?: string;
    loaderClass?: string;
    autoRotate?: boolean;
    disablePan?: boolean;
    disableZoom?: boolean;
    interactions?: "auto" | "none";
    disableTap?: boolean;
    cameraControls?: boolean;
    modelClassName?: string;
}
import { useEffect, useRef, useState } from "react";
import { Flex } from "../flex";
import classNames from "classnames";
import { ModelViewerElement } from "@google/model-viewer";
import { Loading } from "../loading";
import "./style.scss";

export const Model = ({
    className,
    loaderClass,
    poster,
    modelPath,
    disablePan,
    disableZoom,
    interactions,
    autoRotate,
    cameraControls,
    disableTap,
}: ModelProps) => {
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
        <Flex as="div" className={classNames("relative z-1", className)}>
            <Loading
                className={classNames("fixed z-10 mt-60 ", loaderClass)}
                loading={loading}
                message="Loading 3D model, please wait..."
            />

            <model-viewer
                id="manifold"
                reveal="auto"
                loading="lazy"
                ref={viewerRef}
                src={modelPath}
                poster={poster}
                tone-mapping="neutral"
                // disable-pan={disablePan === undefined ? false : disablePan}
                // disable-zoom={disableZoom === undefined ? false : disableZoom}
                // disable-tap={disableTap === undefined ? false : disableTap}
                // interaction-prompt={interactions || "auto"}
                camera-controls={
                    cameraControls === undefined ? true : cameraControls
                }
                shadow-intensity="1"
                exposure="0.8"
                shadow-softness="1"
                // environment-image="legacy"
                environment-image="/images/model-viewer/room-1.hdr"
                // environment="legacy"
                camera-orbit="-247.4deg 80.79deg 13.73m"
                field-of-view="26.33deg"
                // auto-rotate={autoRotate === undefined ? true : autoRotate}
            ></model-viewer>
        </Flex>
    );
};
