import { useOutletContext } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumb, Button, Scroller } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    const crumbs = useBreadcrumbs();

    return (
        <div className="outliner-model">
            <Breadcrumb crumbs={crumbs} />
            <div className="title">{outliner.model?.name}</div>
            <Scroller maxHeight={600}>
                {outliner.model?.children?.map((item, i) => {
                    return <Button variant="outliner" key={i} icon="folder" text={item.name} />;
                })}
            </Scroller>
        </div>
    );
};
