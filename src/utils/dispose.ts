import { Group, Material, Mesh, MeshStandardMaterial, Object3D } from "three";

export const disposeObject = (obj?: Object3D | null) => {
    if (obj) {
        const disposables: Array<Object3D> = [];
        disposables.push(obj);

        if (obj instanceof Mesh) {
            if (obj.children) {
                obj.children.forEach((item) => {
                    disposables.push(item);
                });
            }
        }

        if (obj instanceof Group) {
            obj.traverse((item) => {
                disposables.push(item);
            });
        }

        disposables.forEach((child: Object3D) => {
            if (child) {
                child.parent?.remove(child);

                // @ts-ignore
                disposeMaterial(child.material);
                // @ts-ignore
                child.geometry?.dispose();
            }
        });
    }
};

export const disposeMaterial = (material?: Material | null) => {
    if (material) {
        if (Array.isArray(material)) {
            material.forEach((tex: Material) => {
                if (tex instanceof MeshStandardMaterial) {
                    tex.map?.dispose();
                    tex.normalMap?.dispose();
                    tex.bumpMap?.dispose();
                    tex.aoMap?.dispose();
                    tex.metalnessMap?.dispose();
                    tex.envMap?.dispose();
                    tex.roughnessMap?.dispose();
                    tex.dispose();
                } else {
                    tex.dispose();
                }
            });
        } else {
            if (material instanceof MeshStandardMaterial) {
                material.map?.dispose();
                material.normalMap?.dispose();
                material.bumpMap?.dispose();
                material.aoMap?.dispose();
                material.metalnessMap?.dispose();
                material.envMap?.dispose();
                material.roughnessMap?.dispose();
                material.dispose();
            } else {
                material.dispose();
            }
        }
    }
};
