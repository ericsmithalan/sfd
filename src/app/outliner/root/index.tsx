import { Outlet, useOutletContext } from "react-router-dom";
import { NavLink } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const RootOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    return (
        <div className="outliner-root">
            {outliner.root.map((item, i) => {
                return (
                    <NavLink
                        variant="outliner"
                        key={i}
                        href={String(item.id)}
                        icon="folder"
                        text={item.name}
                    />
                );
            })}

            <Outlet context={{ outliner }} />
        </div>
    );
};
