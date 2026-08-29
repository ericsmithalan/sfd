import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Object3D } from "three";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import { ISelectionEvent } from "../../../lib/Selection";
import { PartsPanel } from "../../panels/parts";
import { ProjectsPanel } from "../../panels/projects";
import "./style.scss";

export const Projects = () => {
    const { outliner, isMobile, viewport, loading } = useOutletContext<{
        viewport: Viewport;
        loading: boolean;
        outliner: IOutlinerContext;
        isMobile: boolean;
    }>();

    const [object, setObject] = useState<Object3D | null>(null);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            setObject(e.object);
        };

        if (viewport && viewport.selection) {
            viewport.selection.addEventListener("change", selectionChange);
        }

        return () => {
            if (viewport && viewport.selection) {
                viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [viewport]);

    return (
        <>
            <ProjectsPanel
                viewport={viewport}
                isMobile={isMobile}
                loading={loading}
                outliner={outliner}
            />
            <PartsPanel
                viewport={viewport}
                isMobile={isMobile}
                loading={loading}
                outliner={outliner}
            />
        </>
    );
};
