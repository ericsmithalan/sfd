import { Fragment } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { NavLink } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const CategoriesOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    return (
        <div className="outliner-root">
            {outliner.categories.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <NavLink
                            variant="outliner"
                            href={`/${String(item.id)}`}
                            icon="folder"
                            text={item.name}
                            onClick={(e) => {
                                if (item.id === outliner.category?.id) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {outliner.category && outliner.category.id === item.id && (
                            <div className="outliner-category-children">
                                {outliner.category.children?.map((item, n) => {
                                    return (
                                        <NavLink
                                            key={n + i + n}
                                            variant="outliner"
                                            href={String(item.id)}
                                            icon="sofa"
                                            text={item.name}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </Fragment>
                );
            })}

            <Outlet context={{ outliner }} />
        </div>
    );
};
