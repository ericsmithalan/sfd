import { IOutlinerModel, IOutlinerProject } from "../interface";

export const projectOutlinerData: Array<IOutlinerProject> = [
    {
        id: "bunks",
        name: "Bunk Beds",
        image: {
            count: 18,
            path: "/models/bunks/images/",
        },
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
        image: {
            count: 3,
            path: "/models/case-1/images/",
        },
        models: [
            {
                url: "/models/case-1/final.glb",
                id: "final",
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
