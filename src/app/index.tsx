"use client";
import { Route, Routes } from "react-router-dom";
import { ModelView } from "../views/model";
import { ProjectView } from "../views/project";
import { Viewer } from "./viewer";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Viewer />}>
                <Route path={"/:projectId/"} element={<ProjectView />}>
                    <Route path={":modelId/"} element={<ModelView />}>
                        <Route path={":objectId/"} element={<ProjectView />}></Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};
