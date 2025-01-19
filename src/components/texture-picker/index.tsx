import { FC, MouseEvent, useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import { IMenuItem, IOutlinerObject } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import { createWoodMaterials, getObject, getTextureById, mapTextureToMenu } from "../../utils";
import { MenuButton } from "../menu-button";
import "./style.scss";

type TexturePickerProps = {
    viewport: Viewport;
    object?: IOutlinerObject | null;
    onChange?: (value: ITexture) => void;
};

export const TexturePicker: FC<TexturePickerProps> = ({ object, onChange, viewport }) => {
    const [selectedVlaue, setSelectedValue] = useState<ITexture | null>(null);
    const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);

    useEffect(() => {
        if (object) {
            const obj = getObject(viewport, object.id, false);

            if (obj && obj.userData instanceof ObjectUserData) {
                setSelectedObject(obj);

                const textureId = obj.userData.textureId;
                if (textureId) {
                    const texture = getTextureById(textureId);
                    setSelectedValue(texture);
                }
            }
        }
    }, [object, viewport]);

    const handleItemClick = async (texture: ITexture | null, e: MouseEvent) => {
        if (texture) {
            const boxMaterials = createWoodMaterials(texture);

            if (selectedObject && selectedObject instanceof Mesh) {
                // selectedPiece.geometry = geometry;
                selectedObject.castShadow = true;
                selectedObject.receiveShadow = true;
                selectedObject.material = boxMaterials;

                setSelectedValue(texture);
            }

            if (onChange) {
                onChange(texture);
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
