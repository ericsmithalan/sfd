"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Object3D } from "three";
import { Region } from "../../components";
import { ISelectionEvent, Viewport } from "../../lib";
import { isObjEmpty } from "../../utils";
import { OutlinerView } from "../../views/outliner";
import "./style.scss";

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>({} as Viewport);
    const [object, setObject] = useState<Object3D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            setObject(e.object);
        };

        let vp: Viewport;

        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current);

                vp.selection.addEventListener("selectionChange", selectionChange);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                vp.selection.addEventListener("selectionChange", selectionChange);
            }
        };
    }, [canvasRef]);

    useEffect(() => {
        if (object) {
            navigate(`${params.projectId}/${params.modelId}/${object.id}/`);
        } else {
            navigate(`${params.projectId}/${params.modelId}`);
        }
    }, [navigate, object, params.modelId, params.projectId]);

    return (
        <div className="viewer">
            {!isObjEmpty(viewport) && (
                <>
                    <Region placement="left">
                        <OutlinerView viewport={viewport} />
                    </Region>

                    <Region placement="right">
                        <Outlet context={{ object: viewport.selection.object }} />
                    </Region>
                </>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
