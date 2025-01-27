import clsx from "clsx";
import { useEffect, useState } from "react";
import { BgImage, Button, Panel, Stats } from "../../../components";
import { ImageViewer } from "../../../components/image-viewer";
import { useOutliner } from "../../../hooks";
import { Viewport } from "../../../lib";
import { generateImageResource, ImageResource } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
    selected: string;
};

type Props = {
    viewport: Viewport;
    loading: boolean;
    isMobile: boolean;
};

export const ModelPanel = ({ viewport, loading, isMobile }: Props) => {
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
            <ImageViewer
                className={clsx(isMobile && "mobile")}
                onClosed={() => {
                    setViewer({ visible: false, selected: "" });
                }}
                visible={viewer.visible}
                images={imageResource.images}
                image={viewer.selected}
            />
            <Panel
                title={`${outliner.model?.name} Info`}
                className={clsx(isMobile && "mobile")}
                icon="blender"
                contentCss="images-panel"
                opened={!isMobile}
            >
                <Button
                    variant="image"
                    onClick={() => {
                        setViewer({
                            visible: true,
                            selected: imageResource.primary,
                        });
                    }}
                >
                    <BgImage minHeight={140} src={`${imageResource.primary}_thumb.png`} />
                </Button>

                {imageResource.images.length > 0 && (
                    <div className="image-list">
                        {imageResource.images.map((item, i) => {
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
        </>
    ) : null;
};
