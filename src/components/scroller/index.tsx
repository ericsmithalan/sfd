import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import "./style.scss";

type ScrollerProps = {
    children?: ReactNode;
    className?: string;
    showShadow?: boolean;
    width?: number | string;
    height?: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
    disable?: boolean;
};

export const Scroller: FC<ScrollerProps> = ({
    width,
    height = "100%",
    maxWidth,
    showShadow = true,
    minWidth,
    minHeight,
    maxHeight,
    className,
    children,

    disable = false,
}) => {
    const [scrolling, setScrolling] = useState(false);

    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollerRef.current;

        const handleScroll = (e: Event) => {
            const scrollEl = e.target as HTMLDivElement;

            if (scrollEl) {
                const top = scrollEl.scrollTop;
                if (top && Number(top)) {
                    if (top < 20) {
                        if (scrolling) {
                            setScrolling(false);
                        }
                    } else {
                        if (top > 20) {
                            if (!scrolling) {
                                setScrolling(true);
                            }
                        }
                    }
                }
            }
        };
        if (el && showShadow) {
            el.addEventListener("scroll", handleScroll);
        }

        () => {
            if (el && showShadow) {
                el.addEventListener("scroll", handleScroll);
            }
        };
    }, [scrollerRef, scrolling, showShadow]);

    return (
        <div
            className={clsx("scroller", disable && "disabled", scrolling && "scrolling", className)}
        >
            <div
                ref={scrollerRef}
                className={clsx("scroller-scroll")}
                style={{
                    width: (!disable && width) || undefined,
                    height: (!disable && height) || undefined,
                    maxHeight: (!disable && maxHeight) || undefined,
                    maxWidth: (!disable && maxWidth) || undefined,
                    minHeight: (!disable && minHeight) || undefined,
                    minWidth: (!disable && minWidth) || undefined,
                }}
            >
                {children}
            </div>
        </div>
    );
};
