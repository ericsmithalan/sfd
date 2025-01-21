import { IOutliner } from "../interface";

export const rootOutliner: Array<IOutliner> = [
    {
        id: 100,
        name: "Desks",
        level: 1,
        children: [
            {
                id: 3223,
                name: "Desk 1",
                level: 2,
                imageResouce: {
                    primaryImg: 1,
                    count: 3,
                    path: "/models/desk/images/",
                },
                children: [
                    {
                        id: 11001,
                        level: 3,
                        modelUrl: "/models/desk/desk1.glb",
                        name: "Final Model",
                        children: [],
                    },
                ],
            },
            {
                id: 3332,
                name: "Desk 2",
                level: 2,
                children: [
                    {
                        id: 11002,
                        modelUrl: "/models/desk-2/desk-2.glb",
                        level: 3,
                        name: "Final Model",
                        children: [],
                    },
                ],
            },
            {
                id: 21,
                name: "Desk 3",
                level: 2,
                children: [
                    {
                        id: 11002,
                        modelUrl: "/models/desk-3/desk-3.glb",
                        level: 3,
                        name: "Final Model",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 23221,
        name: "Beds",
        level: 1,
        children: [
            {
                id: 411,
                level: 2,
                name: "Bunk Bed",
                imageResouce: {
                    primaryImg: 18,
                    count: 18,
                    path: "/models/bunks/images/",
                },
                children: [
                    {
                        id: 7564,
                        modelUrl: "/models/bunks/bunks1.glb",
                        level: 3,
                        name: "Final Model",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 9873,
        name: "Display Cases",
        level: 1,
        children: [
            {
                id: 8983,
                level: 2,
                name: "Case 1",
                children: [
                    {
                        id: 5672,
                        modelUrl: "/models/john/case-1.glb",
                        level: 3,
                        name: "Final Model",
                        children: [],
                    },
                ],
            },
        ],
    },
];
// export const rootOutliner: Array<IOutliner> = [
//     {
//         id: 11000,
//         name: "Bunk Beds",
//         level: 1,
//         imageResouce: {
//             primaryImg: 18,
//             count: 18,
//             path: "/models/bunks/images/",
//         },
//         children: [
//             {
//                 id: 11001,
//                 level: 2,
//                 modelUrl: "/models/bunks/bunks1.glb",
//                 name: "Final Model",
//                 children: [],
//             },
//             {
//                 id: 11002,
//                 modelUrl: "/models/bunks/mockups.glb",
//                 level: 2,
//                 name: "Initial Mockups",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 11003,
//         name: "Case",
//         level: 1,
//         imageResouce: {
//             primaryImg: 10,
//             count: 10,
//             path: "/models/case-1/images/",
//         },
//         children: [
//             {
//                 modelUrl: "/models/case-1/final.glb",
//                 level: 3,
//                 id: 11004,
//                 name: "Final Model",
//                 children: [],
//             },
//             {
//                 modelUrl: "/models/case-1/build.glb",
//                 level: 3,
//                 id: 11005,
//                 name: "Build Steps",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 11006,
//         name: "Desk",
//         level: 1,
//         imageResouce: {
//             primaryImg: 1,
//             count: 3,
//             path: "/models/desk/images/",
//         },
//         children: [
//             {
//                 modelUrl: "/models/desk/desk1.glb",
//                 level: 2,
//                 id: 11007,
//                 name: "Final Model",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 11023,
//         name: "Desk 2",
//         level: 1,
//         children: [
//             {
//                 modelUrl: "/models/desk-2/desk-2.glb",
//                 level: 2,
//                 id: 11022,
//                 name: "Final Model",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 11323,
//         name: "Desk 3",
//         level: 1,
//         children: [
//             {
//                 modelUrl: "/models/desk-3/desk-3.glb",
//                 level: 2,
//                 id: 11322,
//                 name: "Final Model",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 12323,
//         name: "Case 2",
//         level: 1,
//         children: [
//             {
//                 modelUrl: "/models/john/case-1.glb",
//                 level: 2,
//                 id: 12322,
//                 name: "Final Model",
//                 children: [],
//             },
//         ],
//     },
// ];

export const outlinerIdToName = (
    outliner: Array<IOutliner> = rootOutliner,
): Record<string, string> => {
    return outliner.reduce((obj, item) => Object.assign(obj, { [`${item.id}`]: item.name }), {});
};

export const outlinerNameMapper: Record<string, string> = outlinerIdToName();
