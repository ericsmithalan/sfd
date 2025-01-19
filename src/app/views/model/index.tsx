import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Panel, Toolbar } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelView = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();
    const [edges, setEdges] = useState(false);

    useEffect(() => {
        setEdges(outliner.viewport.showEdges);
    }, [outliner.viewport]);

    return (
        <>
            <Panel contentCss="model-view" title={outliner.model?.name} icon="blender">
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

                {/* {outliner.object && defaultTexture && (
                    <TexturePicker viewport={outliner.viewport} object={outliner.object} />
                )} */}
            </Panel>
        </>
    );
};
