import { Route, Routes } from "react-router-dom";
import { Viewer } from "./Viewer";
import { OutlinerView } from "./outliner";
import { CategoriesOutliner } from "./outliner/categories";
import { ModelOutliner } from "./outliner/model";
import { ProjectOutliner } from "./outliner/project";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
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
