import { FC, useEffect, useState } from "react";
import { Button, Panel, TexturePicker } from "../../components";
import { defaultTexture, woodTextures } from "../../data";
import { useModel } from "../../hooks";
import { Viewport } from "../../lib";
import "./style.scss";

type ToolbarProps = {
    viewport: Viewport;
};

export const Toolbar: FC<ToolbarProps> = ({ viewport }) => {
    const [visible, setVisible] = useState(false);
    const [edges, setEdges] = useState(false);
    const model = useModel();

    useEffect(() => {
        setEdges(viewport.edges);
    }, [viewport]);

    useEffect(() => {
        if (model.model) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [model]);

    return visible ? (
        <Panel className="app-toolbar-panel" contentCss="app-toolbar">
            <Button
                variant="toolbar"
                icon="shape-2"
                active={edges}
                onClick={(e) => {
                    viewport.edges = !edges;
                    setEdges(!edges);
                }}
            />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
        </Panel>
    ) : null;
};
