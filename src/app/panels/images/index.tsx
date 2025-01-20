import { useEffect, useState } from "react";
import { BgImage, Button, Panel } from "../../../components";
import { useOutliner } from "../../../hooks";
import { generateImageResource } from "../../../utils";
import "./style.scss";

export const ImagesPanel = () => {
    const [visisble, setVisible] = useState(false);
    const [primaryImage, setPrimaryImage] = useState<string>("");
    const [images, setImages] = useState<Array<string>>([]);
    const outliner = useOutliner();

    useEffect(() => {
        if (outliner.project) {
            const imgResource = generateImageResource(outliner.project.imageResouce);

            if (imgResource) {
                setPrimaryImage(imgResource.primary);
                setImages(imgResource.images);
            }

            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [outliner.project]);

    return visisble ? (
        <Panel title="Images" icon="multi-image" contentCss="images-panel">
            <Button variant="image">
                <BgImage minHeight={300} src={primaryImage} />
            </Button>
            <div className="image-list">
                {images.map((item, i) => {
                    if (i < 4) {
                        return (
                            <Button variant="image" key={i}>
                                <BgImage minHeight={50} src={item} />
                            </Button>
                        );
                    }
                })}
            </div>
        </Panel>
    ) : null;
};
