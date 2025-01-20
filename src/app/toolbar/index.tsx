import { FC } from "react";
import { Button, Panel, TexturePicker } from "../../components";
import { defaultTexture, woodTextures } from "../../data";
import { Viewport } from "../../lib";
import "./style.scss";

type ToolbarProps = {
    viewport: Viewport;
};

export const Toolbar: FC<ToolbarProps> = ({ viewport }) => {
    return (
        <Panel className="app-toolbar-panel" contentCss="app-toolbar">
            <Button variant="toolbar" icon="shape-2" />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
            <TexturePicker texture={defaultTexture} items={woodTextures} />
        </Panel>
    );
};
