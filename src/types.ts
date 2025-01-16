export type ViewportSpace = "world" | "local";
export type SelectMode = "select" | "edit";
export type PickPropertiesType<T> = Pick<
    T,
    {
        [K in keyof T]: T[K] extends Function ? never : K;
    }[keyof T]
>;

export type RegionPlacement = "left" | "right" | "top" | "bottom";

export type IconName =
    | "box"
    | "arrow-up"
    | "arrow-down"
    | "hidden"
    | "lock"
    | "unlock"
    | "visible"
    | "save"
    | "cursor"
    | "light"
    | "undo"
    | "redo"
    | "texture"
    | "add"
    | "dark"
    | "folder"
    | "stack"
    | "world"
    | "texture"
    | "theme-light"
    | "theme-dark"
    | "rotate"
    | "scale"
    | "grid"
    | "back"
    | "crumb-divider"
    | "translate"
    | "camera"
    | "error"
    | "scene";
