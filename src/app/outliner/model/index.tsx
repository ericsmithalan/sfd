import clsx from "clsx";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Object3D } from "three";
import { OutlinerTitle, Scroller } from "../../../components";
import { OutlinerButton } from "../../../components/outliner-button";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import { ISelectionEvent } from "../../../lib/Selection";
import { getObject, setObjectVisibility } from "../../../utils";
import "./style.scss";

export const ModelOutliner = () => {
    const { viewport, loading, outliner } = useOutletContext<{
        viewport: Viewport;
        loading: boolean;
        outliner: IOutlinerContext;
    }>();
    const [object, setObject] = useState<Object3D | null>(null);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            setObject(e.object);
        };

        if (viewport.selection) {
            viewport.selection.addEventListener("change", selectionChange);
        }

        return () => {
            if (viewport.selection) {
                viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [viewport]);

    return (
        <div className={clsx("outliner-model", outliner.isMobile && "mobile")}>
            {!loading && (
                <OutlinerTitle
                    isMobile={outliner.isMobile}
                    className={clsx(outliner.isMobile && "mobile")}
                    subTitle={outliner.isMobile ? undefined : "Objects"}
                    title={outliner.model?.name}
                    iconName="blender"
                />
            )}

            {!outliner.isMobile && (
                <Scroller scrollTo={object ? `obj_${object.id}` : undefined}>
                    {outliner.model?.children?.map((item, i) => {
                        return (
                            <OutlinerButton
                                id={`obj_${item.id}`}
                                key={i}
                                active={object?.id === item.id}
                                text={item.name}
                                onVisible={(visible, e) => {
                                    setObjectVisibility(viewport, item.id, visible);
                                }}
                                onClick={(e) => {
                                    getObject(viewport, item.id, true);
                                }}
                            />
                        );
                    })}
                </Scroller>
            )}
        </div>
    );
};
