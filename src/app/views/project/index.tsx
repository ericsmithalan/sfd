import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { BgImage, Button, Panel } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
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
    const [primaryImage, setPrimaryImage] = useState("");

    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
    });
    const params = useParams();

    useEffect(() => {
        if (params && params.projectId) {
            const projectOutliner = getProject(params.projectId);

            if (projectOutliner) {
                const img = projectOutliner.image;

                const arr: Array<string> = [];
                for (let i = 0; i < img.count; i++) {
                    if (i + 1 === img.primaryImg) {
                        setPrimaryImage(`${img.path}${i + 1}_thumb.png`);
                    }
                    arr.push(`${img.path}${i + 1}_thumb.png`);
                }

                setImages(arr);
            }

            setProject(projectOutliner);
        }
    }, [params.projectId]);

    return (
        <>
            <Panel
                className="project-view"
                title={`Project Images (${images.length - 1})`}
                icon="texture"
            >
                <div className="primary-image">
                    <Button
                        variant="image"
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewer({
                                visible: true,
                                selected: primaryImage,
                            });
                        }}
                    >
                        <BgImage
                            size="cover"
                            height={200}
                            width={"100%"}
                            src={primaryImage}
                        />
                    </Button>
                </div>
                <div className="images">
                    {images.map((img, i) => {
                        if (i < 3) {
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
                                    <BgImage size="cover" src={img} />
                                </Button>
                            );
                        } else {
                            return;
                        }
                    })}
                </div>
            </Panel>

            <Outlet
                context={{ viewport: context.viewport, project: project }}
            />

            <ImageViewer
                onClosed={() => {
                    setViewer({ visible: false, selected: "" });
                }}
                visible={viewer.visible}
                images={images}
                image={viewer.selected}
            />
        </>
    );
};
