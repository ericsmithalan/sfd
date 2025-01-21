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
    {
        id: 653,
        name: "Sideboards",
        level: 1,
        children: [
            {
                id: 4334,
                level: 2,
                name: "Sideboard 1",
                imageResouce: {
                    primaryImg: 10,
                    count: 10,
                    path: "/models/case-1/images/",
                },
                children: [
                    {
                        id: 10984,
                        modelUrl: "/models/case-1/final.glb",
                        level: 3,
                        name: "Final Model",
                        children: [],
                    },
                    {
                        id: 5342,
                        modelUrl: "/models/case-1/build.glb",
                        level: 3,
                        name: "Build",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 3223,
        name: "Mockups",
        level: 1,
        children: [
            {
                id: 433,
                level: 2,
                name: "Living Room Set",
                children: [
                    {
                        id: 4262,
                        modelUrl: "/models/living-room-set/chair.glb",
                        level: 3,
                        name: "Chair",
                        children: [],
                    },
                ],
            },
        ],
    },
];

export const outlinerIdToName = (
    outliner: Array<IOutliner> = rootOutliner,
): Record<string, string> => {
    return outliner.reduce((obj, item) => Object.assign(obj, { [`${item.id}`]: item.name }), {});
};

export const outlinerNameMapper: Record<string, string> = outlinerIdToName();
