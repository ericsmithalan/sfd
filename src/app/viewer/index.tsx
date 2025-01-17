"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Object3D } from "three";
import { Region } from "../../components";
import { Loading } from "../../components/loading";
import { IModelEvent, ISelectionEvent, Viewport } from "../../lib";
import { OutlinerView } from "../views/outliner";
import "./style.scss";

export interface IOutletContenxt {
    viewport: Viewport;
}

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>();
    const [object, setObject] = useState<Object3D | null>(null);
    const [model, setModel] = useState<Object3D | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const params = useParams();

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

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            setObject(e.object);

            if (e.object) {
                // navigate(`./${e.object.id}`);
            } else {
                // navigate(`${params.projectId}/${params.modelId}`);
            }
        };

        const loadingModel = (e: IModelEvent["load"]) => {
            setLoading(true);
        };

        const modelChange = (e: IModelEvent["changed"]) => {
            setModel(e.model);
            setLoading(false);
        };

        if (viewport) {
            viewport.modelFile.addEventListener("load", loadingModel);
            viewport.modelFile.addEventListener("changed", modelChange);
            viewport.selection.addEventListener("selectionChange", selectionChange);
        }

        return () => {
            if (viewport) {
                viewport.modelFile.removeEventListener("load", loadingModel);
                viewport.modelFile.removeEventListener("changed", modelChange);
                viewport.selection.removeEventListener("selectionChange", selectionChange);
            }
        };
    }, [viewport, params, navigate]);

    return (
        <div className="viewer">
            {loading && <Loading message={"loading"} />}
            <Region placement="left">
                {viewport && <OutlinerView object={object} model={model} viewport={viewport} />}
            </Region>
            <Region placement="right">
                <Outlet
                    context={{
                        params: params,
                        viewport: viewport,
                        projectOutliner: null,
                        modelOutliner: null,
                        objectOutliner: null,
                    }}
                />
            </Region>
            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
