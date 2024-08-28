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
            "effect-composer": EffectComposer;
            "pixelate-effect": React.DetailedHTMLProps<Partial<PixelateEffect>>;
            "bloom-effect": React.DetailedHTMLProps<Partial<BloomEffect>>;
            "selective-bloom-effect": React.DetailedHTMLProps<
                Partial<SelectiveBloomEffect>
            >;
            "color-grade-effect": React.DetailedHTMLProps<
                Partial<ColorGradeEffect>
            >;
            "outline-effect": React.DetailedHTMLProps<Partial<OutlineEffect>>;
            "ssao-effect": React.DetailedHTMLProps<Partial<SSAOEffect>>;
            "smaa-effect": React.DetailedHTMLProps<Partial<SMAAEffect>>;
            "glitch-effectr": React.DetailedHTMLProps<Partial<GlitchEffect>>;
        }
    }
}
