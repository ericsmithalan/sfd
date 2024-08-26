"use client";

import { ModelViewerJSX } from "@/types";
import { useEffect } from "react";
import { Flex } from "../flex";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": ModelViewerJSX &
                React.DetailedHTMLProps<
                    React.HTMLAttributes<HTMLElement>,
                    HTMLElement
                >;
        }
    }
}

export const ModelViewer = () => {
    const glbSrc = "/models/bunkbed-pre-design.glb";
    const iosSrc = "/models/bunkbed-pre-design.usdz";

    useEffect(() => {
        import("@google/model-viewer/lib/model-viewer").catch(console.error);
    }, []);

    return (
        <Flex as="div" className="w-screen h-screen">
            <model-viewer
                id="first"
                src={glbSrc}
                ios-src={iosSrc}
                seamless-poster
                environment-image="neutral"
                exposure="1.0"
                interaction-prompt-threshold="0"
                shadow-intensity="1"
                ar
                autoplay
                ar-modes="webxr scene-viewer quick-look"
                auto-rotate
                camera-controls
                camera-orbit="0deg 90deg 0deg 8.37364m"
                alt="3D model"
            >
                <div className="poster" slot="poster">
                    <img className="pre-prompt" src="/glb/prompt.svg" />
                </div>
            </model-viewer>
        </Flex>
    );
};
