import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/page.home';

import QueuePage from './pages/dataStructure/page.queue';
import StackPage from './pages/dataStructure/page.stack';

import SelectionSortPage from './pages/sort/page.selectionSort';
import InsertionSortPage from './pages/sort/page.insertionSort';
import BubbleSortPage from './pages/sort/page.bubbleSort';
import MergeSortPage from './pages/sort/page.mergeSort';
import HeapSortPage from './pages/sort/page.heapSort';
import QuickSortPage from './pages/sort/page.quickSort';

import BFSPage from './pages/graph/page.bfs';
import DFSPage from './pages/graph/page.dfs';
import DijkstraPage from './pages/graph/page.dijkstra';
import BellmanFordPage from './pages/graph/page.bellman-ford';
import FloydWarshallPage from './pages/graph/page.floyd-warshall';
import MinimumSpanningTreePage from './pages/graph/page.minimum-spanning-tree';

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
                    <Route path="queue" element={<QueuePage />} />
                    <Route path="stack" element={<StackPage />} />

                    {/* 정렬 */}
                    <Route path="selection_sort" element={<SelectionSortPage />} />
                    <Route path="insertion_sort" element={<InsertionSortPage />} />
                    <Route path="bubble_sort" element={<BubbleSortPage />} />
                    <Route path="merge_sort" element={<MergeSortPage />} />
                    <Route path="heap_sort" element={<HeapSortPage />} />
                    <Route path="quick_sort" element={<QuickSortPage />} />

                    {/* 그래프 */}
                    <Route path="bfs" element={<BFSPage />} />
                    <Route path="dfs" element={<DFSPage />} />
                    <Route path="dijkstra" element={<DijkstraPage />} />
                    <Route path="bellman-ford" element={<BellmanFordPage />} />
                    <Route path="floyd-warshall" element={<FloydWarshallPage />} />
                    <Route path="minimum-spanning-tree" element={<MinimumSpanningTreePage />} />

                    {/* 404 */}
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
