"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Region } from "../../components";
import { OutlinerProvider } from "../../context";
import { Viewport } from "../../lib";
import { OutlinerView } from "../views/outliner";
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
                <OutlinerProvider viewport={viewport}>
                    <Region placement="left">
                        <OutlinerView />
                    </Region>

                    <Region placement="right">
                        <Outlet />
                    </Region>
                </OutlinerProvider>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
