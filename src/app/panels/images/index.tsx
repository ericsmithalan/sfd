import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import { generateImageResource } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

type ImagesPanelProps = {
    onLoading?: (loading: boolean) => void;
};

export const ImagesPanel = ({ onLoading }: ImagesPanelProps) => {
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
            {primaryImage && (
                <Button
                    variant="toolbar"
                    text="Images"
                    icon="multi-image"
                    onClick={() => {
                        setViewer({
                            visible: true,
                            selected: primaryImage,
                        });
                    }}
                ></Button>
            )}

            <ImageViewer
                className={clsx(outliner.isMobile && "mobile")}
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
