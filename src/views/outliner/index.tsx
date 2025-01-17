import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OutlinerTree, Panel } from "../../components";
import { Config } from "../../Config";
import { IModelOutliner, IObjectOutliner, IProjectOutliner, Viewport } from "../../lib";
import { getObject } from "../../utils";

type OutlinerViewProps = {
    viewport: Viewport;
};

export const OutlinerView = ({ viewport }: OutlinerViewProps) => {
    const [rootOutliner] = useState<Array<IProjectOutliner>>(Config.rootOutliner);
    const [projectOutliner, setProjectOutliner] = useState<IProjectOutliner | null>(null);
    const [modelOutliner, setModelOutliner] = useState<IModelOutliner | null>(null);
    const [objectOutliner, setObjectOutliner] = useState<IObjectOutliner | null>(null);

    const params = useParams();

    useEffect(() => {
        const load = async (outliner: IModelOutliner) => {
            const file = await viewport.modelFile.load(outliner);
            setModelOutliner(file.userData.outliner);
        };

        if (params) {
            if (params.projectId) {
                const project = Config.rootOutliner.find((item) => item.id === params.projectId);

                if (project) {
                    if (project.id !== projectOutliner?.id) {
                        setProjectOutliner(project);
                    }

                    if (params.modelId) {
                        if (params.modelId !== modelOutliner?.id) {
                            const model = project.models.find((item) => item.id === params.modelId);
                            if (model) {
                                load(model);
                            }
                        } else {
                            if (params.objectId) {
                                if (Number(params.objectId) !== objectOutliner?.id) {
                                    const obj = getObject(viewport, Number(params.objectId), true);
                                    if (obj) {
                                        setObjectOutliner(obj.userData.outliner);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [modelOutliner, objectOutliner, params, projectOutliner, viewport]);

    return (
        <Panel>
            <OutlinerTree
                rootOutliner={rootOutliner}
                project={projectOutliner}
                model={modelOutliner}
                object={objectOutliner}
            />
        </Panel>
    );
};
