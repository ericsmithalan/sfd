import { createContext, useState } from "react";
import { Group, Object3D } from "three";
import { IObjectMaterial } from "../interface";
import { Viewport } from "../lib";

export interface IModelContext extends ModelState {
    viewport: Viewport;
}

export const ModelContext = createContext<IModelContext>({} as IModelContext);

type ModelState = {
    model: Object3D | null;
    edges: Group | null;
    materials: Map<string, IObjectMaterial>;
};

type ModelContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const ModelProvider = ({ children, viewport }: ModelContextProps) => {
    const [state, setState] = useState<ModelState>({
        model: null,
        edges: null,
        materials: new Map(),
    });

    return (
        <ModelContext.Provider
            value={{
                viewport: viewport,
                model: state.model,
                edges: state.edges,
                materials: state.materials,
            }}
        >
            {children}
        </ModelContext.Provider>
    );
};
