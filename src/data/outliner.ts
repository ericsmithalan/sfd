import { IOutliner } from "../interface";

export const projectOutlinerData: Array<IOutliner> = [
    {
        id: 10001000,
        name: "Bunk Beds",
        level: 1,
        imageResouce: {
            primaryImg: 18,
            count: 18,
            path: "/models/bunks/images/",
        },
        models: [
            {
                id: 10001001,
                level: 2,
                modelUrl: "/models/bunks/bunks1.glb",
                name: "Final Model",
                children: [],
            },
            {
                id: 10001002,
                modelUrl: "/models/bunks/mockups.glb",
                level: 2,
                name: "Initial Mockups",
                children: [],
            },
        ],
    },
    {
        id: 10001003,
        name: "Case",
        level: 1,
        imageResouce: {
            primaryImg: 10,
            count: 10,
            path: "/models/case-1/images/",
        },
        models: [
            {
                modelUrl: "/models/case-1/final.glb",
                level: 3,
                id: 10001004,
                name: "Final Model",
                children: [],
            },
            {
                modelUrl: "/models/case-1/build.glb",
                level: 3,
                id: 10001005,
                name: "Build Steps",
                children: [],
            },
        ],
    },
    {
        id: 10001006,
        name: "Desk",
        level: 1,
        imageResouce: {
            primaryImg: 1,
            count: 3,
            path: "/models/desk/images/",
        },
        models: [
            {
                modelUrl: "/models/desk/desk1.glb",
                level: 2,
                id: 10001007,
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

// export const getProject = (projectId: string): IOutlinerProject | null => {
//     return projectOutlinerData.find((item) => item.id === projectId) || null;
// };

// // export const getModel = (project: IOutliner, modelId: string): IOutlinerModel | null => {
//     return project.models.find((item) => item.id === modelId) || null;
// };
