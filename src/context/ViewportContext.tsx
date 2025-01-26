import { Loading } from "@/components";
import { IViewportEvent, Viewport } from "@/lib";
import { createContext, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

export interface IViewportContext {
    viewport: Viewport | null;
}

export const ViewportContext = createContext<IViewportContext>({} as IViewportContext);

type Props = {
    children?: React.ReactNode;
};

export const ViewportProvider = ({ children }: Props) => {
    const [viewport, setViewport] = useState<Viewport | null>(null);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let vp: Viewport;
        const loading = (e: IViewportEvent["loading"]) => {
            setLoading(e.value);
        };

        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current, isMobile);
                vp.addEventListener("loading", loading);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                vp.removeEventListener("loading", loading);
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <ViewportContext.Provider
            value={{
                viewport: viewport,
            }}
        >
            <div id="viewer-main" className="viewer">
                {loading && <Loading message="Loading" />}

                <canvas className="canvas" ref={canvasRef} />
                {children}
            </div>
        </ViewportContext.Provider>
    );
};
