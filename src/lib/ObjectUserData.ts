import { IHomeSceneModel, IOutliner } from "../interface";

export interface IEdgeInfo {
    objectId: number;
    edgeId: number;
}

export interface ITextureInfo {
    textureId: number | null;
}

export interface IViewportInfo {
    selectable: boolean;
}

export interface IObjectUserData {
    outliner: IOutliner | null;
    edgeInfo: IEdgeInfo | null;
    textureInfo: ITextureInfo | null;
    viewportInfo: IViewportInfo | null;
}

export class ObjectUserData implements IObjectUserData {
    outliner: IOutliner | null;
    edgeInfo: IEdgeInfo | null;
    textureInfo: ITextureInfo | null;
    viewportInfo: IViewportInfo | null;
    homeInfo: IHomeSceneModel | null;

    constructor(
        outliner: IOutliner | null = null,
        viewportInfo: IViewportInfo | null,
        edgeInfo: IEdgeInfo | null = null,
        textureInfo: ITextureInfo | null = null,
        homeInfo: IHomeSceneModel | null = null,
    ) {
        this.outliner = outliner;
        this.edgeInfo = edgeInfo;
        this.textureInfo = textureInfo;
        this.viewportInfo = viewportInfo;
        this.homeInfo = homeInfo;
    }
}
