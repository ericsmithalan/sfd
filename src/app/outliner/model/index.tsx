import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Object3D } from "three";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Button, OutlinerTitle, Scroller } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { ISelectionEvent } from "../../../lib/Selection";
import { getObject } from "../../../utils";
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
            <Scroller maxHeight={600}>
                {outliner.model?.children?.map((item, i) => {
                    return (
                        <Button
                            variant="outliner"
                            key={i}
                            active={object?.id === item.id}
                            icon="box-1"
                            text={item.name}
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
