import { OutlinerTree } from "@/components/outliner-tree";
import { Panel } from "@/components/panel";
import { useOutliner } from "@/hooks";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel>
            <OutlinerTree
                rootOutliner={outliner.rootOutliner}
                project={outliner.project}
                model={outliner.model}
                object={outliner.object}
            />
        </Panel>
    );
};
