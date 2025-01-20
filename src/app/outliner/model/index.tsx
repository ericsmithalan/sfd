import { useNavigate, useOutletContext } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Button, OutlinerTitle, Scroller } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();
    const navigate = useNavigate();
    const crumbs = useBreadcrumbs();

    return (
        <div className="outliner-model">
            <OutlinerTitle
                crumbs={crumbs}
                onBack={() => {
                    navigate(-1);
                }}
                title={outliner.model?.name}
                iconName="blender"
            />
            <Scroller maxHeight={600}>
                {outliner.model?.children?.map((item, i) => {
                    return <Button variant="outliner" key={i} icon="box-1" text={item.name} />;
                })}
            </Scroller>
        </div>
    );
};
