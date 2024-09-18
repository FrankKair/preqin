import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InvestorListPage, InvestorDetailPage } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={InvestorListPage} />
        <Route path='/investors' Component={InvestorListPage} />
        <Route path="/investors/:id" Component={InvestorDetailPage} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
