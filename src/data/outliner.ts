import { IOutlinerModel, IOutlinerProject } from "../interface";

export const projectOutlinerData: Array<IOutlinerProject> = [
    {
        id: "bunks",
        name: "Bunk Beds",
        models: [
            {
                url: "/models/bunks/bunks1.glb",
                id: "beds",
                name: "Beds",
                children: [],
            },
            {
                url: "/models/bunks/mockups.glb",
                id: "mockups",
                name: "Mockups",
                children: [],
            },
        ],
    },
    {
        id: "case1",
        name: "Case",
        models: [
            {
                url: "/models/case-1/final.glb",
                id: "final",
                name: "Case",
                children: [],
            },
        ],
    },
    {
        id: "cabinet",
        name: "Cabinet",
        models: [
            {
                url: "/models/john/case-1.glb",
                id: "case",
                name: "Case",
                children: [],
            },
        ],
    },
];

export const getProject = (projectId: string): IOutlinerProject | null => {
    return projectOutlinerData.find((item) => item.id === projectId) || null;
};

export const getModel = (
    project: IOutlinerProject,
    modelId: string,
): IOutlinerModel | null => {
    return project.models.find((item) => item.id === modelId) || null;
};
