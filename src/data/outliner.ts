import { IOutliner } from "../interface";

export const rootOutliner: Array<IOutliner> = [
    {
        group: true,
        name: "Completed",
        id: 1,
    },
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
        id: 233,
        name: "Tables",
        level: 1,
        children: [
            {
                id: 3441,
                level: 2,
                name: "Shaker Table",
                children: [
                    {
                        id: 3320,
                        modelUrl: "/models/shaker-table/shaker-table.glb",
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
        group: true,
        name: "In Process",
        id: 2,
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
        group: true,
        name: "Misc",
        id: 2,
    },
    {
        id: 3223,
        name: "Designs",
        level: 1,
        children: [
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
            {
                id: 433,
                level: 2,
                name: "Living Room Set",
                children: [
                    {
                        id: 3244,
                        modelUrl: "/models/living-room-set/sofa.glb",
                        level: 3,
                        name: "Sofa",
                        children: [],
                    },
                    {
                        id: 4262,
                        modelUrl: "/models/living-room-set/chair.glb",
                        level: 3,
                        name: "Chair",
                        children: [],
                    },
                    {
                        id: 3211,
                        modelUrl: "/models/living-room-set/end-table.glb",
                        level: 3,
                        name: "End Table",
                        children: [],
                    },
                ],
            },
            {
                id: 4444,
                level: 2,
                name: "Kitchen Table",
                children: [
                    {
                        id: 3333,
                        modelUrl: "/models/kitchen-table/kitchen-table.glb",
                        level: 3,
                        name: "Table",
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
