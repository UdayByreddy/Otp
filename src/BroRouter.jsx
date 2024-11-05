/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GitUrlSearch from './Practice/GitUrlSearch';
import App from './App';
import NestedComments from './Practice/NestedComments';


const queryClient = new QueryClient();

export default function BroRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/git' element={<GitUrlSearch />} />
          <Route path='/otp' element={<App />} />
          <Route path='/' element={<NestedComments />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
