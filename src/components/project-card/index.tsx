import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { IStat } from "../../interface";
import { BgImage } from "../bg-image";
import { Icon } from "../icon";
import { Stats } from "../stats";
import "./style.scss";

type ProjectCardProps = {
    title?: string;
    href?: string;
    stats?: Array<IStat>;
    className?: string;
    image?: string | null;
};

export const ProjectCard: FC<ProjectCardProps> = ({ className, title, image, stats, href }) => {
    return (
        <NavLink to={href || ""} className={clsx("project-card", className)}>
            {title && (
                <div className="card-title">
                    <Icon name="blender" active={true} />
                    {title}
                </div>
            )}
            {image && (
                <BgImage
                    maxHeight={300}
                    minHeight={200}
                    width={"100%"}
                    src={`${image}_thumb.png`}
                />
            )}
            {stats && <Stats stats={stats} />}
            <div className="inner-border"></div>
        </NavLink>
    );
};
