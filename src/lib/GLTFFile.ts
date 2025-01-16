import { Material, Mesh, Object3D, PerspectiveCamera, Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ObjectUserData } from "./ObjectUserData";
import { IModelOutliner, IObjectOutliner, IRootOutliner } from "@/interface";

export interface SFDCurrentFile {
    url: string;
    obj: Object3D;
}

export interface IGLTFResult {
    model: Object3D;
    outliner: Array<IModelOutliner>;
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

    load = (obj: IModelOutliner): Promise<IGLTFResult> => {
        return new Promise((resolve, reject) => {
            if (this.model) {
                this.materials.clear();
                this.scene.remove(this.model);
                this.model = null;
            }
            if (obj.url) {
                this.loader.load(obj.url, (gltf) => {
                    this.gtlf = gltf;
                    this.model = gltf.scene;
                    this.model.castShadow = true;
                    this.model.receiveShadow = true;

                    this.model.traverse((object: Object3D) => {
                        if (object instanceof Mesh) {
                            object.castShadow = true;
                            object.receiveShadow = true;

                            const outlinerUD: IObjectOutliner = {
                                id: object.id,
                                name: object.name,
                                icon: "box",
                                children: [],
                                level: 1,
                            };

                            object.userData =
                                new ObjectUserData<IObjectOutliner>({
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
