import { ModelViewerElement } from "@google/model-viewer";
import {
    GlitchEffect,
    SMAAEffect,
    SSAOEffect,
    OutlineEffect,
    ColorGradeEffect,
    SelectiveBloomEffect,
    BloomEffect,
    PixelateEffect,
} from "@google/model-viewer-effects";

export declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<
                Partial<ModelViewerElement>
            >;
        }
    }
}
