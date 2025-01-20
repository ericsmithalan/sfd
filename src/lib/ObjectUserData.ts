import { IOutliner } from "../interface";

interface IEdgeInfo {
    objectId: number;
}

interface ITextureInfo {
    textureId: string | null;
    unwrapped: boolean;
}

export interface IObjectUserData {
    outliner: IOutliner | null;
    edgeInfo: IEdgeInfo | null;
    textureInfo: ITextureInfo | null;
}

export class ObjectUserData implements IObjectUserData {
    constructor(
        public outliner: IOutliner | null = null,
        public edgeInfo: IEdgeInfo | null = null,
        public textureInfo: ITextureInfo | null = null,
    ) {
        this.outliner = outliner;
        this.edgeInfo = edgeInfo;
        this.textureInfo = textureInfo;
    }
}
