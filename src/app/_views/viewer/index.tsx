"use client";
import { Region } from "@/components";
import { ObjectProvider, OutlinerProvider } from "@/context";
import { Viewport } from "@/lib";
import { isObjEmpty } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { OutlinerView } from "../outliner";
import "./style.scss";

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>({} as Viewport);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isObjEmpty(viewport) && canvasRef) {
            if (canvasRef.current) {
                setViewport(new Viewport(canvasRef.current));
            }
        }
    }, [canvasRef, viewport]);

    return (
        <div className="viewer">
            {!isObjEmpty(viewport) && (
                <>
                    <OutlinerProvider viewport={viewport}>
                        <Region placement="left">
                            <OutlinerView />
                        </Region>
                    </OutlinerProvider>

                    <ObjectProvider viewport={viewport}>
                        <Region placement="right">
                            <Outlet />
                        </Region>
                    </ObjectProvider>
                </>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
