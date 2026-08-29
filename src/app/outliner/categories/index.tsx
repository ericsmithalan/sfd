import clsx from "clsx";
import { Fragment } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { NavLink, OutlinerTitle } from "../../../components";
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
            <OutlinerTitle title="" noIcon={true} subTitle="Projects" />

            {outliner.models.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <NavLink
                            variant="outliner"
                            href={`/${String(item.parentName)}/${String(item.name)}`}
                            icon="box-1"
                            active={outliner.category?.id === item.id}
                            text={item.name}
                            onClick={(e) => {
                                if (item.id === outliner.category?.id) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Fragment>
                );
            })}

            <Outlet context={{ outliner }} />
        </div>
    );
};
