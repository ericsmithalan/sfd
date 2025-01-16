"use client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelView } from "./_views/model";
import { ObjectView } from "./_views/object";
import { ProjectView } from "./_views/project";
import { Viewer } from "./_views/viewer";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Viewer />}>
                    <Route path={"/:projectId/"} element={<ProjectView />}>
                        <Route path={":modelId/"} element={<ModelView />}>
                            <Route
                                path={":objectId/"}
                                element={<ObjectView />}
                            ></Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
