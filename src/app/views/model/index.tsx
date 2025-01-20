import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Loading, Panel, TexturePicker, Toolbar } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { IObjectMaterial } from "../../../interface";
import { IModelEvent } from "../../../lib";
import "./style.scss";

export const ModelView = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();
    const [edges, setEdges] = useState(false);
    const [materials, setMaterials] = useState<Map<string, IObjectMaterial>>(new Map());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEdges(outliner.viewport.showEdges);

        const materialChanged = (e: IModelEvent["materialChanged"]) => {
            setMaterials(e.materials);
        };

        outliner.viewport.modelFile.addEventListener("materialChanged", materialChanged);

        return () => {
            outliner.viewport.modelFile.removeEventListener("materialChanged", materialChanged);
        };
    }, [outliner.viewport]);

    return (
        <>
            <Panel contentCss="model-view" title={outliner.model?.name} icon="blender">
                {loading && <Loading message="loading material" />}
                <Toolbar>
                    <Button
                        variant="toolbar"
                        text={edges ? "Hide Edges" : "Show Edges"}
                        active={edges}
                        icon={edges ? "shape" : "shape"}
                        onClick={(e) => {
                            outliner.viewport.showEdges = !edges;
                            setEdges(!edges);
                        }}
                    />
                </Toolbar>

                <div className="materials">
                    {materials
                        .entries()
                        .toArray()
                        .map(([key, value], i) => {
                            return (
                                <div key={i}>
                                    <TexturePicker
                                        label={key}
                                        onLoading={(loading) => {
                                            setLoading(loading);
                                        }}
                                        viewport={outliner.viewport}
                                        objects={value.objects}
                                    />
                                </div>
                            );
                        })}
                </div>
            </Panel>
        </>
    );
};
