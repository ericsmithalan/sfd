"use client";
import { Navigate, Route, Routes } from "react-router-dom";
import { Viewer } from "./viewer";
import { ModelView } from "./views/model";
import { ObjectView } from "./views/object";
import { ProjectView } from "./views/project";

export const App = () => {
    return (
        <Routes>
            <Route path="viewer/*" element={<Viewer />}>
                <Route path=":projectId/" element={<ProjectView />}>
                    <Route path=":modelId/" element={<ModelView />}>
                        <Route path=":objectId" element={<ObjectView />}></Route>
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/viewer" />}></Route>
        </Routes>
    );
};
