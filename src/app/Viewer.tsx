"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Region } from "../components";
import { OutlinerProvider } from "../context";
import { Viewport } from "../lib";
import "./style.scss";

export interface IOutletContenxt {
    viewport: Viewport;
}

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let vp: Viewport;
        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <div className="viewer">
            {viewport && (
                <>
                    <Region placement="left">
                        <OutlinerProvider viewport={viewport}>
                            <Outlet />
                        </OutlinerProvider>
                    </Region>
                </>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
