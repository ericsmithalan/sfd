import { useEffect, useState } from "react";
import { ProjectCard } from "../../../components";
import { DATA } from "../../../data";
import { IOutliner } from "../../../interface";
import { generateImageResource } from "../../../utils";
import "./style.scss";

export const HomePage = () => {
    const [data, setData] = useState<Array<IOutliner> | null>(null);

    useEffect(() => {
        const projects: Array<IOutliner> = [];
        for (const item of DATA.rootOutliner) {
            if (item.children) {
                for (const child of item.children) {
                    child.parentId = item.id;
                    projects.push(child);
                }
            }
        }

        setData(projects);
    }, []);

    return (
        <div className="home-page">
            <div className="cards">
                {data?.map((item, i) => {
                    let image: string | null = null;

                    if (item.imageResouce) {
                        const imgResource = generateImageResource(item.imageResouce);
                        image = imgResource?.primary || null;
                    }

                    const getModelId = (): IOutliner | null => {
                        if (item.children) {
                            return item.children[0];
                        }
                        return null;
                    };

                    const model = getModelId();

                    return (
                        <ProjectCard
                            href={`/viewer/${item.parentId}/${item.id}${
                                model?.id ? `/${model.id}` : ""
                            }`}
                            key={i}
                            stats={model?.stats}
                            image={image}
                            title={item.name}
                        />
                    );
                })}
            </div>
        </div>
    );
};
