import clsx from "clsx";
import { Fragment } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { NavLink } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import "./style.scss";

export const CategoriesOutliner = () => {
    const { outliner, isMobile } = useOutletContext<{
        outliner: IOutlinerContext;
        viewport: Viewport;
        loading: boolean;
        isMobile: boolean;
    }>();

    return (
        <div className={clsx("outliner-root", isMobile && "mobile")}>
            {outliner.categories.map((item, i) => {
                return (
                    <Fragment key={i}>
                        {item.group ? (
                            <div key={i} className="outliner-group">
                                {item.name}
                            </div>
                        ) : (
                            <>
                                <NavLink
                                    variant="outliner"
                                    href={`/models/${String(item.id)}`}
                                    icon="folder"
                                    active={outliner.category?.id === item.id}
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
                            </>
                        )}
                    </Fragment>
                );
            })}

            <Outlet context={{ outliner }} />
        </div>
    );
};
