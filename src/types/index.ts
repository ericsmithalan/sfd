export interface Address {
    city: string;
    state: string;
    zip: string;
}

export interface ModelViewerJSX {
    src: string;
    poster?: string;
    iosSrc?: string;
    seamlessPoster?: boolean;
    autoplay?: boolean;
    environmentImage?: string;
    exposure?: string;
    interactionPromptThreshold?: string;
    shadowIntensity?: string;
    ar?: boolean;
    arModes?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    cameraOrbit?: string;
    alt?: string;
    sx?: any;
}

export interface FlexAttribures {
    dir?: "col" | "row";
    full?: "w" | "h" | "both";
    screen?: "w" | "h" | "both";
    flex?: "1" | "auto" | "initial" | "none";
    inline?: boolean;
    grow?: boolean;
    shrink?: boolean;
    wrap?: boolean;
    contain?: boolean;

    justify?: [
        "self" | "items" | "content",
        "start" | "center" | "end" | "between" | "around" | "stretch" | "evenly"
    ];
    align?: [
        "self" | "items" | "content",
        "start" | "center" | "end" | "between" | "around" | "stretch" | "evenly"
    ];
}
