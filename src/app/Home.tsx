import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ObjectUserData, Viewport } from "../lib";
import { ISelectionEvent } from "../lib/Selection";

export const HomeView = () => {
    const { viewport, loading, isMobile } = useOutletContext<{
        viewport: Viewport;
        loading: boolean;
        isMobile: boolean;
    }>();

    const navigate = useNavigate();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            const obj = e.object;
            if (obj) {
                if (obj.userData instanceof ObjectUserData && obj.userData.homeInfo) {
                    const { categoryId, modelId } = obj.userData.homeInfo;

                    navigate(`/models/${categoryId}/${modelId}`);
                }
            }
        };

        viewport.toggleHome(true);
        viewport.selection?.addEventListener("change", selectionChange);

        return () => {
            viewport.toggleHome(false);
            viewport.selection?.removeEventListener("change", selectionChange);
        };
    }, [viewport]);

    return <div>home</div>;
};
