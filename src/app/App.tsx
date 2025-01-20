import { Route, Routes } from "react-router-dom";
import { outlinerNameMapper } from "../data";
import { Viewer } from "./Viewer";
import { OutlinerView } from "./outliner";
import { ModelOutliner } from "./outliner/model";
import { ProjectOutliner } from "./outliner/project";
import { RootOutliner } from "./outliner/root";

export const App = () => {
    console.log(outlinerNameMapper);
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
                <Route element={<OutlinerView />}>
                    <Route path="" element={<RootOutliner />} />
                    <Route path=":projectId" element={<ProjectOutliner />} />
                    <Route path=":projectId/:modelId" element={<ModelOutliner />} />
                </Route>
            </Route>
        </Routes>
    );
};
