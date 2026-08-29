import { Navigate, Route, Routes } from "react-router-dom";
import { Viewer } from "./Viewer";
import { OutlinerView } from "./outliner";
import { Projects } from "./outliner/projects";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
                <Route path="" element={<OutlinerView />}>
                    <Route path="" element={<Navigate to="/Desks/Desk" />} />
                    <Route path=":categoryName/:modelName" element={<Projects />} />
                </Route>
            </Route>
        </Routes>
    );
};
