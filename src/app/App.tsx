import { Route, Routes } from "react-router-dom";

import { OutlinerView } from "./outliner";
import { CategoriesOutliner } from "./outliner/categories";
import { ModelOutliner } from "./outliner/model";
import { ProjectOutliner } from "./outliner/project";
import { HomePage } from "./pages/home";
import { ViewerPage } from "./pages/viewer/Viewer";

export const App = () => {
    console.log("app");
    return (
        <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/viewer" element={<ViewerPage />}>
                <Route path="" element={<OutlinerView />}>
                    <Route path="" element={<CategoriesOutliner />} />
                    <Route path=":categoryId" element={<CategoriesOutliner />} />
                    <Route path=":categoryId/:projectId" element={<ProjectOutliner />} />
                    <Route path=":categoryId/:projectId/:modelId" element={<ModelOutliner />} />
                </Route>
            </Route>
        </Routes>
    );
};
