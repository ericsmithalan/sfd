import { Logo, Panel } from "../../components";
import { useOutliner } from "../../hooks";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel className="outliner-panel" contentCss="outliner-content">
            <div className="logo-content">
                <Logo height={45} />
            </div>
        </Panel>
    );
};
