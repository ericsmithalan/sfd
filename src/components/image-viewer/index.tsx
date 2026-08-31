import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BgImage } from "../bg-image";
import { Button } from "../button";
import { Icon } from "../icon";
import { Scroller } from "../scroller";
import "./style.scss";

type ImageViewerProps = {
    className?: string;
    images: Array<string>;
    image?: string;
    visible?: boolean;
    onClosed?: () => void;
};

export const ImageViewer: FC<ImageViewerProps> = ({
    images,
    visible,
    image,
    onClosed,
    className,
}) => {
    const [selected, setSelected] = useState<string>();
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible) {
            setIsVisible(visible);
        }

        if (image) {
            setSelected(image);
        } else {
            setSelected(images[0]);
        }
    }, [images, image, visible, divRef]);

    return isVisible
        ? createPortal(
              <div
                  className={clsx("image-viewer", className)}
                  onClick={(e) => {
                      e.stopPropagation();
                      setIsVisible(false);
                      if (onClosed) {
                          onClosed();
                      }
                  }}
              >
                  <div
                      className="viewer"
                      onClick={(e) => {
                          e.stopPropagation();
                      }}
                  >
                      <div className="header">
                          <Icon name="image" fill />
                          <div className="title"> Images</div>

                          <Button
                              className="close"
                              icon="close"
                              variant="close"
                              onClick={() => {
                                  setIsVisible(false);
                                  if (onClosed) {
                                      onClosed();
                                  }
                              }}
                          />
                      </div>
                      <div className="selected">
                          <BgImage size="contain" height={"100%"} src={`${selected}.png`} />
                      </div>

                      <Scroller className="images" direction="x" height={130} showShadow={false}>
                          {images.map((img, i) => {
                              return (
                                  <Button
                                      variant="image"
                                      key={i}
                                      active={img.replace("_thumb", "") === selected}
                                      onClick={(e) => {
                                          setSelected(img.replace("_thumb", ""));
                                      }}
                                  >
                                      <BgImage
                                          width={100}
                                          height={100}
                                          size="cover"
                                          src={`${img}_thumb.png`}
                                      />
                                  </Button>
                              );
                          })}
                      </Scroller>

                      <div className="inner-border"></div>
                  </div>
              </div>,
              document.body,
          )
        : null;
};
