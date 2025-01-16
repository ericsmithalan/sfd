import { NavLink } from "@/components";
import { useOutliner } from "@/hooks";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <div>
            {outliner.root.map((item, i) => {
                return (
                    <NavLink href={`/${item.name}`} key={i}>
                        {item.name}
                    </NavLink>
                );
            })}
        </div>
    );
};
