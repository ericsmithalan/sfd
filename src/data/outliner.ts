import { IOutliner } from "../interface";

export const rootOutliner: Array<IOutliner> = [
    {
        id: 11000,
        name: "Bunk Beds",
        level: 1,
        imageResouce: {
            primaryImg: 18,
            count: 18,
            path: "/models/bunks/images/",
        },
        models: [
            {
                id: 11001,
                level: 2,
                modelUrl: "/models/bunks/bunks1.glb",
                name: "Final Model",
                children: [],
            },
            {
                id: 11002,
                modelUrl: "/models/bunks/mockups.glb",
                level: 2,
                name: "Initial Mockups",
                children: [],
            },
        ],
    },
    {
        id: 11003,
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
                id: 11004,
                name: "Final Model",
                children: [],
            },
            {
                modelUrl: "/models/case-1/build.glb",
                level: 3,
                id: 11005,
                name: "Build Steps",
                children: [],
            },
        ],
    },
    {
        id: 11006,
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
                id: 11007,
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

export const outlinerIdToName = (
    outliner: Array<IOutliner> = rootOutliner,
): Record<string, string> => {
    return outliner.reduce((obj, item) => Object.assign(obj, { [`${item.id}`]: item.name }), {});
};

export const outlinerNameMapper: Record<string, string> = outlinerIdToName();
