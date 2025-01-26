"use client";
import { Loading } from "@/components";
import { IViewportEvent, Viewport } from "@/lib";
import { ReactNode, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

type Props = {
    children?: ReactNode;
};

export const ViewerLayoutClient = ({ children }: Props) => {
    const [viewport, setViewport] = useState<Viewport>();
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let vp: Viewport;
        const loading = (e: IViewportEvent["loading"]) => {
            setLoading(e.value);
        };

        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current, isMobile);
                vp.addEventListener("loading", loading);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                vp.removeEventListener("loading", loading);
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <div id="viewer-main" className="viewer">
            {loading && <Loading message="Loading" />}

            <canvas className="canvas" ref={canvasRef} />

            <div className="content">{children}</div>
        </div>
    );
};
