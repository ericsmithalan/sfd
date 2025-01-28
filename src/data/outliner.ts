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
                id: 11001,
                level: 3,
                imageResouce: {
                    primaryImg: 1,
                    count: 3,
                    path: "/models/desk/images/",
                },
                modelUrl: "/models/desk/desk1.glb",
                name: "Desk",
                children: [],
            },
        ],
    },

    {
        id: 23221,
        name: "Beds",
        level: 1,
        children: [
            {
                id: 7564,
                modelUrl: "/models/bunks/bunks1.glb",
                level: 3,
                name: "Bunk Bed",
                imageResouce: {
                    primaryImg: 18,
                    count: 18,
                    path: "/models/bunks/images/",
                },
                children: [],
            },
            {
                id: 7921,
                modelUrl: "/models/bunks/twin-Portfolio.glb",
                level: 3,
                name: "Twin Bed",
                imageResouce: {
                    primaryImg: 18,
                    count: 18,
                    path: "/models/bunks/images/",
                },
                children: [],
            },
        ],
    },
    {
        id: 7663,
        name: "Boxes",
        level: 1,
        children: [
            {
                id: 8888,
                modelUrl: "/models/toolbox/tool-box.glb",
                level: 3,
                name: "Toolbox",
                imageResouce: {
                    primaryImg: 4,
                    count: 4,
                    path: "/models/toolbox/images/",
                },
                children: [],
            },
        ],
    },
    {
        id: 999,
        name: "Chairs",
        level: 1,
        children: [
            {
                id: 987,
                level: 3,
                imageResouce: {
                    primaryImg: 11,
                    count: 11,
                    path: "/models/windsor-chair/images/",
                },
                modelUrl: "/models/windsor-chair/chair.glb",
                name: "Windsor Chair",
                children: [],
            },
        ],
    },
    {
        id: 233,
        name: "Tables",
        level: 1,
        children: [
            {
                id: 3320,
                name: "Shaker Table",
                modelUrl: "/models/shaker-table/shaker-table.glb",
                level: 3,
                imageResouce: {
                    primaryImg: 1,
                    count: 3,
                    path: "/models/shaker-table/images/",
                },
                children: [],
            },
        ],
    },
    {
        id: 653,
        name: "Sideboards",
        level: 1,
        children: [
            {
                id: 10984,
                modelUrl: "/models/case-1/final.glb",
                level: 3,
                name: "Sideboard",
                imageResouce: {
                    primaryImg: 10,
                    count: 10,
                    path: "/models/case-1/images/",
                },
                children: [],
            },
        ],
    },
    {
        group: true,
        name: "Misc Designs",
        id: 2,
    },
    {
        id: 3223,
        name: "Designs",
        level: 1,
        children: [
            {
                id: 9873,
                name: "Display Case",
                level: 1,
                modelUrl: "/models/john/case-1.glb",
            },
            {
                id: 11002,
                modelUrl: "/models/desk-2/desk-2.glb",
                level: 3,
                name: "Deks-1",
                children: [],
            },
            {
                id: 11002,
                modelUrl: "/models/desk-3/desk-3.glb",
                level: 3,
                name: "Desk 2",
                children: [],
            },
            {
                id: 3333,
                modelUrl: "/models/kitchen-table/kitchen-table.glb",
                level: 3,
                name: "Kitchen Table",
                children: [],
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
