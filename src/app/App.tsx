import { Navigate, Route, Routes } from "react-router-dom";
import { HomeView } from "./Home";
import { Viewer } from "./Viewer";
import { OutlinerView } from "./outliner";
import { CategoriesOutliner } from "./outliner/categories";
import { ModelOutliner } from "./outliner/model";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
                <Route path="" element={<Navigate to="home" />} />
                <Route path="home" element={<HomeView />} />
                <Route path="models" element={<OutlinerView />}>
                    <Route path="" element={<CategoriesOutliner />} />
                    <Route path=":categoryId" element={<CategoriesOutliner />} />
                    <Route path=":categoryId/:modelId" element={<ModelOutliner />} />
                </Route>
            </Route>
        </Routes>
    );
};
