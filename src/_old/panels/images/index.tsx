import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import { generateImageResource, ImageResource } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

type ImagesPanelProps = {
    onLoading?: (loading: boolean) => void;
};

export const ImagesPanel = ({ onLoading }: ImagesPanelProps) => {
    const [imageResource, setImageResource] = useState<ImageResource | null>(null);
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
        selected: "",
    });

    const outliner = useOutliner();

    useEffect(() => {
        if (outliner.model) {
            const resources = outliner.model.imageResouce;

            if (resources) {
                const imgResource = generateImageResource(outliner.model.imageResouce);
                setImageResource(imgResource);
            } else {
                setImageResource(null);
                setViewer({ visible: false, selected: "" });
            }
        }

        if (!outliner.model) {
            setImageResource(null);
        }
    }, [outliner.model]);

    return outliner.model && imageResource ? (
        <>
            {imageResource.primary && (
                <Button
                    variant="toolbar"
                    text="Images"
                    icon="multi-image"
                    onClick={() => {
                        setViewer({
                            visible: true,
                            selected: imageResource.primary,
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
                images={imageResource.images}
                image={viewer.selected}
            />
        </>
    ) : null;
};
