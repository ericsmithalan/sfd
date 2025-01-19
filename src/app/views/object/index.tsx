import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Panel } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ObjectView = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    useEffect(() => {
        const { object, navigate, params } = outliner;
        // if (object) {
        //     if (object.id !== Number(params.objectId) && project && model && object)
        //         navigate(`/${project?.id}/${model?.id}/${object.id}`);
        // } else {
        //     if (project && model) {
        //         navigate(`/${project?.id}/${model?.id}`);
        //     }
        // }
        // return () => {
        //     if (params.objectId && !object) {
        //         navigate(".");
        //     }
        // };
    }, [outliner.object]);

    return (
        <Panel contentCss="object-view" title={outliner.object?.name} icon="box">
            object view
        </Panel>
    );
};
