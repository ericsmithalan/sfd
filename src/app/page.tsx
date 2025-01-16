"use client";
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    BrowserRouter,
} from "react-router-dom";
import { Viewer } from "./_views/viewer";
import { ProjectView } from "./_views/project";
import { ModelView } from "./_views/model";
import { ObjectView } from "./_views/object";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Viewer />}>
                    <Route path={"/:prjectId/"} element={<ProjectView />}>
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
