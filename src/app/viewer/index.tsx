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
                console.log("disposed");
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <div className="viewer">
            <Region placement="left">
                <OutlinerProvider viewport={viewport || null}>
                    {viewport && <OutlinerView />}
                </OutlinerProvider>
            </Region>

            <Region placement="right">
                <Outlet
                    context={{
                        viewport: viewport,
                    }}
                />
            </Region>

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
