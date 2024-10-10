import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/page.home';

import StackPage from './pages/dataStructure/page.stack';

import SelectionSortPage from './pages/sort/page.selectionSort';

import BFSPage from './pages/graph/page.bfs';

import NotFoundPage from './pages/page.notFound';

import { ThemeProvider } from './context/themeContext';

const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    {/* Root */}
                    <Route path="" element={<HomePage />} />

                    {/* 자료구조 */}
                    <Route path="stack" element={<StackPage />} />

                    {/* 정렬 */}
                    <Route path="selection-sort" element={<SelectionSortPage />} />

                    {/* 그래프 */}
                    <Route path="bfs" element={<BFSPage />} />

                    {/* 404 */}
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
