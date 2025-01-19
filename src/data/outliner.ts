import { IOutlinerModel, IOutlinerProject } from "../interface";

export const projectOutlinerData: Array<IOutlinerProject> = [
    {
        id: "bunks",
        name: "Bunk Beds",
        image: {
            primaryImg: 18,
            count: 18,
            path: "/models/bunks/images/",
        },
        models: [
            {
                url: "/models/bunks/bunks1.glb",
                id: "main",
                name: "Final Model",
                children: [],
            },
            {
                url: "/models/bunks/mockups.glb",
                id: "mockups",
                name: "Initial Mockups",
                children: [],
            },
        ],
    },
    {
        id: "case1",
        name: "Case",
        image: {
            primaryImg: 10,
            count: 10,
            path: "/models/case-1/images/",
        },
        models: [
            {
                url: "/models/case-1/final.glb",
                id: "final",
                name: "Final Model",
                children: [],
            },
            {
                url: "/models/case-1/build.glb",
                id: "build",
                name: "Build Steps",
                children: [],
            },
        ],
    },
    {
        id: "desk1",
        name: "Desk",
        image: {
            primaryImg: 1,
            count: 3,
            path: "/models/desk/images/",
        },
        models: [
            {
                url: "/models/desk/desk1.glb",
                id: "main",
                name: "Final Model",
                children: [],
            },
        ],
    },
    // {
    //     id: "case2",
    //     name: "Case",
    //     image: {
    //         count: 0,
    //         path: "/models/john/images/",
    //     },
    //     models: [
    //         {
    //             url: "/models/john/case-1.glb",
    //             id: "case-2",
    //             name: "Case",
    //             children: [],
    //         },
    //     ],
    // },
];

export const getProject = (projectId: string): IOutlinerProject | null => {
    return projectOutlinerData.find((item) => item.id === projectId) || null;
};

export const getModel = (project: IOutlinerProject, modelId: string): IOutlinerModel | null => {
    return project.models.find((item) => item.id === modelId) || null;
};
