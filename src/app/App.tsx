import { Route, Routes } from "react-router-dom";
import { Viewer } from "./Viewer";
import { OutlinerView } from "./outliner";
import { CategoriesOutliner } from "./outliner/categories";
import { ModelOutliner } from "./outliner/model";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
                <Route path="" element={<OutlinerView />}>
                    <Route path="" element={<CategoriesOutliner />} />
                    <Route path=":categoryName" element={<CategoriesOutliner />} />
                    <Route path=":categoryName/:modelName" element={<ModelOutliner />} />
                </Route>
            </Route>
        </Routes>
    );
};
