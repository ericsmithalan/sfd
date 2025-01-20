import { BufferAttribute, BufferGeometry } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { ChartOptions, PackOptions, UVUnwrapper } from "xatlas-three";

let unwrapperLoaded = false;
const unwrapper = new UVUnwrapper({ BufferAttribute: BufferAttribute });

export const unwrapGeometry = async (
    geometry: BufferGeometry,
    options?: {
        chartOptions?: ChartOptions;
        packOptions?: PackOptions;
        useNormals?: boolean;
        timeUnwrap?: boolean;
        logProgress?: boolean;
        forceUnwrap?: boolean;
    },
): Promise<BufferGeometry> => {
    const defaultChartOptions = {
        fixWinding: true,
        maxBoundaryLength: 0,
        maxChartArea: 1024,
        maxCost: 3,
        maxIterations: 1,
        normalDeviationWeight: 2,
        normalSeamWeight: 4,
        roundnessWeight: 0.001,
        straightnessWeight: 6,
        textureSeamWeight: 4,
        useInputMeshUvs: false,
    };

    const defaultPackOptions = {
        bilinear: true,
        blockAlign: false,
        bruteForce: true,
        createImage: false,
        maxChartSize: 0,
        padding: 2,
        resolution: 1024,
        rotateCharts: true,
        rotateChartsToAxis: true,
        texelsPerUnit: 0,
    };

    if (!unwrapperLoaded) {
        await unwrapper.loadLibrary(
            (mode, progress) => {
                // console.log(mode, progress);
            },
            "https://cdn.jsdelivr.net/npm/xatlasjs@0.2.0/dist/xatlas.wasm",
            "https://cdn.jsdelivr.net/npm/xatlasjs@0.2.0/dist/xatlas.js",
        );

        unwrapperLoaded = true;
    }

    /**
     * only unwrap once unless you force it.
     * force can be used when an objects size changes but even then I'm not sure it's necessary
     */
    let unwrap = options?.forceUnwrap || false;

    if (unwrap) {
        unwrapper.packOptions = {
            ...defaultPackOptions,
            ...options?.packOptions,
        };

        unwrapper.chartOptions = {
            ...defaultChartOptions,
            ...options?.chartOptions,
        };

        unwrapper.useNormals = options?.useNormals || false;
        unwrapper.timeUnwrap = options?.timeUnwrap || false;
        unwrapper.logProgress = options?.logProgress || false;

        if (geometry.index) {
            geometry = mergeVertices(geometry);
        }

        await unwrapper.unwrapGeometry(geometry);
    }

    return geometry;
};
