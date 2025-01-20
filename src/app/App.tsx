import { Navigate, Route, Routes } from "react-router-dom";
import { Viewer } from "./Viewer";
import { ModelOutliner } from "./outliner/model";
import { ProjectOutliner } from "./outliner/project";
import { RootOutliner } from "./outliner/root";

export const App = () => {
    return (
        <Routes>
            <Route path="/*" element={<Viewer />}>
                <Route path="" element={<Navigate to="projects" />} />
                <Route path="projects" element={<RootOutliner />}>
                    <Route path=":projectId" element={<ProjectOutliner />}>
                        <Route path=":modelId" element={<ModelOutliner />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};
