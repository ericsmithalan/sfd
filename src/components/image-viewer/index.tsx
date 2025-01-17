import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BgImage } from "../bg-image";
import { Button } from "../button";
import { Scroller } from "../scroller";
import "./style.scss";

type ImageViewerProps = {
    images: Array<string>;
    imageId?: number;
    visible?: boolean;
};

export const ImageViewer: FC<ImageViewerProps> = ({
    images,
    visible,
    imageId,
}) => {
    const [selected, setSelected] = useState<string>();
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef) {
        }

        if (visible) {
            setIsVisible(visible);
        }

        if (imageId) {
            setSelected(images[imageId]?.replace("_thumb", ""));
        } else {
            setSelected(images[0]?.replace("_thumb", ""));
        }
    }, [images, imageId, visible, divRef]);

    return isVisible
        ? createPortal(
              <div
                  className={clsx("image-viewer")}
                  onClick={(e) => {
                      e.stopPropagation();
                      console.log("clicked");
                      setIsVisible(false);
                  }}
              >
                  <div
                      className="viewer"
                      onClick={(e) => {
                          e.stopPropagation();
                      }}
                  >
                      <div className="selected">
                          <BgImage
                              size="cover"
                              width={800}
                              height={500}
                              src={selected || ""}
                          />
                      </div>
                      <Scroller className="images">
                          {images.map((img, i) => {
                              return (
                                  <Button
                                      key={i}
                                      onClick={(e) => {
                                          setSelected(
                                              img.replace("_thumb", ""),
                                          );
                                      }}
                                  >
                                      <BgImage
                                          width={100}
                                          height={100}
                                          size="cover"
                                          src={img}
                                      />
                                  </Button>
                              );
                          })}
                      </Scroller>
                  </div>
              </div>,
              document.body,
          )
        : null;
};
