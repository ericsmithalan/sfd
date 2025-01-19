import { IOutlinerModel, IOutlinerProject } from "../interface";

export const projectOutlinerData: Array<IOutlinerProject> = [
    {
        id: "bunks_6OG-1",
        name: "Bunk Beds",
        image: {
            primaryImg: 18,
            count: 18,
            path: "/models/bunks/images/",
        },
        models: [
            {
                url: "/models/bunks/bunks1.glb",
                id: "main_K07vd",
                name: "Final Model",
                children: [],
            },
            {
                url: "/models/bunks/mockups.glb",
                id: "mockups_GDS96",
                name: "Initial Mockups",
                children: [],
            },
        ],
    },
    {
        id: "case_iQoJe",
        name: "Case",
        image: {
            primaryImg: 10,
            count: 10,
            path: "/models/case-1/images/",
        },
        models: [
            {
                url: "/models/case-1/final.glb",
                id: "final_9F1h2",
                name: "Final Model",
                children: [],
            },
            {
                url: "/models/case-1/build.glb",
                id: "build_qoh-y",
                name: "Build Steps",
                children: [],
            },
        ],
    },
    {
        id: "desk_-QO-V",
        name: "Desk",
        image: {
            primaryImg: 1,
            count: 3,
            path: "/models/desk/images/",
        },
        models: [
            {
                url: "/models/desk/desk1.glb",
                id: "main_yEix4",
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
