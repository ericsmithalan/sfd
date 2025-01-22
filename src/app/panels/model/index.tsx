import { useEffect, useState } from "react";
import { BgImage, Button, Panel, Stats } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import { generateImageResource } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

export const ModelPanel = () => {
    const [visisble, setVisible] = useState(false);
    const [images, setImages] = useState<Array<string>>([]);
    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
    });

    const outliner = useOutliner();

    useEffect(() => {
        if (outliner.project) {
            const resources = outliner.project.imageResouce;

            if (resources) {
                const imgResource = generateImageResource(outliner.project.imageResouce);

                if (imgResource) {
                    setImages(imgResource.images);
                    setPrimaryImage(imgResource.primary);
                } else {
                    setImages([]);
                    setPrimaryImage(null);
                }
            } else {
                setImages([]);
                setViewer({ visible: false, selected: "" });
            }

            if (!outliner.model && !resources) {
                setVisible(false);
                setImages([]);
                setPrimaryImage(null);
            } else {
                setVisible(true);
            }
        } else {
            setVisible(false);
        }
    }, [outliner.project, outliner.model]);

    return visisble ? (
        <>
            <Panel title={outliner.project?.name} icon="blender" contentCss="images-panel">
                {primaryImage && (
                    <Button
                        variant="image"
                        onClick={() => {
                            setViewer({
                                visible: true,
                                selected: primaryImage,
                            });
                        }}
                    >
                        <BgImage minHeight={140} src={`${primaryImage}_thumb.png`} />
                    </Button>
                )}

                {images.length > 0 && (
                    <div className="image-list">
                        {images.map((item, i) => {
                            if (i < 3) {
                                return (
                                    <Button
                                        variant="image"
                                        key={i}
                                        onClick={() => {
                                            setViewer({
                                                visible: true,
                                                selected: item,
                                            });
                                        }}
                                    >
                                        <BgImage minHeight={90} src={`${item}_thumb.png`} />
                                    </Button>
                                );
                            }
                        })}
                    </div>
                )}

                {outliner.model?.stats && <Stats stats={outliner.model?.stats || []} />}
            </Panel>
            <ImageViewer
                onClosed={() => {
                    setViewer({ visible: false, selected: "" });
                }}
                visible={viewer.visible}
                images={images}
                image={viewer.selected}
            />
        </>
    ) : null;
};
