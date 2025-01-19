import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BgImage, Button, Panel } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

export const ProjectView = () => {
    const [images, setImages] = useState<Array<string>>([]);
    const [primaryImage, setPrimaryImage] = useState("");
    const outliner = useOutliner();

    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
    });

    useEffect(() => {
        if (outliner.project) {
            const img = outliner.project.image;

            const arr: Array<string> = [];
            for (let i = 0; i < img.count; i++) {
                if (i + 1 === img.primaryImg) {
                    setPrimaryImage(`${img.path}${i + 1}_thumb.png`);
                }
                arr.push(`${img.path}${i + 1}_thumb.png`);
            }

            setImages(arr);
        }
    }, [outliner.project]);

    return (
        <>
            <Panel
                contentCss="project-view"
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
                        <BgImage size="cover" height={200} width={"100%"} src={primaryImage} />
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
                context={{
                    outliner: outliner,
                }}
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
