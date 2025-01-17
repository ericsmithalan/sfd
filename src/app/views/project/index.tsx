import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { BgImage, Button, Panel } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { Scroller } from "../../../components/scroller";
import { getProject } from "../../../data";
import { IOutlinerProject } from "../../../interface";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: number;
};

export const ProjectView = () => {
    const [project, setProject] = useState<IOutlinerProject | null>(null);
    const [images, setImages] = useState<Array<string>>([]);
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: 0,
    });
    const params = useParams();

    useEffect(() => {
        if (params && params.projectId) {
            const projectOutliner = getProject(params.projectId);

            if (projectOutliner) {
                const arr: Array<string> = [];
                for (let i = 0; i < projectOutliner.image.count; i++) {
                    arr.push(`${projectOutliner.image.path}${i + 1}_thumb.png`);
                }

                console.log(arr);
                setImages(arr);
            }

            setProject(projectOutliner);
        }
    }, [params]);

    return (
        <>
            <Panel className="project-view" title={project?.name} icon="folder">
                <Scroller maxHeight={100} className="images">
                    {images.map((img, i) => {
                        return (
                            <Button
                                variant="image"
                                key={i}
                                onClick={(e) => {
                                    setViewer({
                                        visible: true,
                                        selected: i + 1,
                                    });
                                }}
                            >
                                <BgImage size="cover" src={img} />
                            </Button>
                        );
                    })}
                </Scroller>
            </Panel>

            <ImageViewer
                visible={viewer.visible}
                images={images}
                imageId={viewer.selected}
            />

            <Outlet />
        </>
    );
};
