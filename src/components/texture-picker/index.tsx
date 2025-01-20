import { FC, MouseEvent, useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import { IMenuItem } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import {
    createSingleWoodMaterials,
    defaultTexture,
    getObjectsById,
    getTextureById,
    mapTextureToMenu,
} from "../../utils";
import { MenuButton } from "../menu-button";
import "./style.scss";

type TexturePickerProps = {
    label?: string;
    viewport: Viewport;
    objects: Array<number>;
    onLoading?: (loading: boolean) => void;
};

export const TexturePicker: FC<TexturePickerProps> = ({ objects, onLoading, label, viewport }) => {
    const [selectedVlaue, setSelectedValue] = useState<ITexture | null>(defaultTexture);
    const [materialObjects, setMaterialObjects] = useState<Array<Object3D>>([]);

    useEffect(() => {
        if (objects.length > 0) {
            const objs = getObjectsById(viewport, objects);
            setMaterialObjects(objs);
        }
    }, [objects, viewport]);

    const handleItemClick = async (texture: ITexture | null, e: MouseEvent) => {
        if (texture) {
            if (onLoading) {
                onLoading(true);
            }
            const materials = await createSingleWoodMaterials(texture);

            for (const obj of materialObjects) {
                if (obj instanceof Mesh) {
                    if (obj.userData instanceof ObjectUserData) {
                        obj.userData.textureInfo?.textureId === texture.id;
                    }

                    obj.castShadow = true;
                    obj.receiveShadow = true;
                    obj.material = materials;

                    setSelectedValue(texture);
                }
            }

            if (onLoading) {
                onLoading(false);
            }
        }
    };

    const getSelectedMenuItem = (): IMenuItem | null => {
        if (selectedVlaue) {
            return {
                name: selectedVlaue.displayName,
                id: selectedVlaue.id,
                image: selectedVlaue.thumbnail,
            };
        }

        return null;
    };

    return (
        <div className="texture-picker">
            <div className="label">{label}</div>
            <MenuButton
                items={mapTextureToMenu()}
                selected={getSelectedMenuItem()}
                onItemClick={(value, e) => {
                    if (value && value.id) {
                        const texture = getTextureById(value.id);
                        handleItemClick(texture, e);
                    }
                }}
            />
        </div>
    );
};
