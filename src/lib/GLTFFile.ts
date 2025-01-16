import { Material, Mesh, Object3D, PerspectiveCamera, Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IOutlinerUserData, ObjectUserData } from "./ObjectUserData";

export interface SFDCurrentFile {
    url: string;
    obj: Object3D;
}

export interface IGLTFResult {
    model: Object3D;
    outliner: Array<IOutlinerUserData>;
}

export class GLTFFile {
    private readonly loader: GLTFLoader;
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly container: HTMLElement;

    materials: Map<number, Material> = new Map();

    gtlf: GLTF | null = null;
    model: Object3D | null = null;

    constructor(
        scene: Scene,
        camera: PerspectiveCamera,
        container: HTMLElement
    ) {
        this.loader = new GLTFLoader();
        this.scene = scene;
        this.camera = camera;
        this.container = container;
    }

    load = (obj: IOutlinerUserData): Promise<IGLTFResult> => {
        return new Promise((resolve, reject) => {
            if (this.model) {
                this.materials.clear();
                this.scene.remove(this.model);
                this.model = null;
            }
            if (obj.url) {
                this.loader.load(obj.url, (gltf) => {
                    this.gtlf = gltf;
                    const outliner: Array<IOutlinerUserData> = [];
                    this.model = gltf.scene;
                    this.model.castShadow = true;
                    this.model.receiveShadow = true;
                    this.model.userData = new ObjectUserData({
                        selectable: true,
                        outliner: {
                            isModel: true,
                            name: obj.name,
                            icon: "stack",
                            url: obj.url,
                            children: [],
                        },
                    });

                    this.model.traverse((object: Object3D) => {
                        if (object instanceof Mesh) {
                            object.castShadow = true;
                            object.receiveShadow = true;

                            const outlinerUD: IOutlinerUserData = {
                                isModel: false,
                                name: object.name,
                                icon: "box",
                                url: object.id.toString(),
                                children: [],
                            };

                            object.userData = new ObjectUserData({
                                selectable: true,
                                outliner: outlinerUD,
                            });

                            this.model?.userData.children.push(outlinerUD);
                        } else {
                            object.layers.disableAll();
                        }
                    });
                });
            }
        });
    };
}
