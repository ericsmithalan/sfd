import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { BgImage, Button, Panel } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { Scroller } from "../../../components/scroller";
import { getProject } from "../../../data";
import { IOutlinerProject } from "../../../interface";
import { Viewport } from "../../../lib";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

export const ProjectView = () => {
    const context = useOutletContext<{ viewport: Viewport }>();
    const [project, setProject] = useState<IOutlinerProject | null>(null);
    const [images, setImages] = useState<Array<string>>([]);
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
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
            <Panel
                className="project-view"
                title={"Project Images"}
                icon="texture"
            >
                <Scroller minHeight={30} maxHeight={250} className="images">
                    {images.map((img, i) => {
                        return (
                            <Button
                                variant="image"
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setViewer({
                                        visible: true,
                                        selected: img,
                                    });
                                }}
                            >
                                <BgImage
                                    size="cover"
                                    width={"100%"}
                                    src={img}
                                />
                            </Button>
                        );
                    })}
                </Scroller>
            </Panel>

            <ImageViewer
                onClosed={() => {
                    setViewer({ visible: false, selected: "" });
                }}
                visible={viewer.visible}
                images={images}
                image={viewer.selected}
            />

            <Outlet
                context={{ viewport: context.viewport, project: project }}
            />
        </>
    );
};
