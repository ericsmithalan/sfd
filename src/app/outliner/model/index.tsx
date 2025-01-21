import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Object3D } from "three";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { OutlinerTitle, Scroller } from "../../../components";
import { OutlinerButton } from "../../../components/outliner-button";
import { IOutlinerContext } from "../../../context";
import { ISelectionEvent } from "../../../lib/Selection";
import { getObject, setObjectVisibility } from "../../../utils";
import "./style.scss";

export const ModelOutliner = () => {
    const [object, setObject] = useState<Object3D | null>(null);
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();
    const navigate = useNavigate();
    const crumbs = useBreadcrumbs();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            setObject(e.object);
        };
        outliner.viewport.selection.addEventListener("change", selectionChange);

        return () => {
            outliner.viewport.selection.removeEventListener("change", selectionChange);
        };
    }, [outliner.viewport]);

    return (
        <div className="outliner-model">
            <OutlinerTitle
                crumbs={crumbs}
                onBack={() => {
                    navigate(-1);
                }}
                title={outliner.model?.name}
                iconName="blender"
            />
            <Scroller scrollTo={object ? `obj_${object.id}` : undefined}>
                {outliner.model?.children?.map((item, i) => {
                    return (
                        <OutlinerButton
                            id={`obj_${item.id}`}
                            key={i}
                            active={object?.id === item.id}
                            text={item.name}
                            onVisible={(visible, e) => {
                                setObjectVisibility(outliner.viewport, item.id, visible);
                            }}
                            onClick={(e) => {
                                getObject(outliner.viewport, item.id, true);
                            }}
                        />
                    );
                })}
            </Scroller>
        </div>
    );
};
