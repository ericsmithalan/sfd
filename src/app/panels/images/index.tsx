import { useEffect, useState } from "react";
import { BgImage, Button, Panel } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import { generateImageResource } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

export const ImagesPanel = () => {
    const [visisble, setVisible] = useState(false);
    const [primaryImage, setPrimaryImage] = useState<string>("");
    const [images, setImages] = useState<Array<string>>([]);
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
    });
    const outliner = useOutliner();

    useEffect(() => {
        if (outliner.project) {
            const imgResource = generateImageResource(outliner.project.imageResouce);

            if (imgResource) {
                setPrimaryImage(imgResource.primary);
                setImages(imgResource.images);
                setVisible(true);
            }
        } else {
            setVisible(false);
        }
    }, [outliner.project]);

    return visisble ? (
        <>
            <Panel title={outliner.project?.name} icon="multi-image" contentCss="images-panel">
                <Button variant="image">
                    <BgImage
                        minHeight={200}
                        onClick={() => {
                            setViewer({
                                visible: true,
                                selected: primaryImage,
                            });
                        }}
                        src={primaryImage}
                    />
                </Button>
                <div className="image-list">
                    {images.map((item, i) => {
                        if (i < 4) {
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
                                    <BgImage minHeight={50} src={item} />
                                </Button>
                            );
                        }
                    })}
                </div>
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
