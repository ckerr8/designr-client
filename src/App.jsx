import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavBar/AppNavBar.jsx';
import Header from './components/Header/Header.jsx';
import MainGrid from './components/MainGrid/MainGrid.jsx';
import AppTheme from './shared-theme/AppTheme.jsx';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Start from "./pages/Start/Start";
import Clients from './pages/Clients/Clients';
import DesignAssets from "./pages/DesignAssets/DesignAssets";
import Analytics from './pages/Analytics/Analytics.jsx'
import ProjectsDetail from "./pages/Projects/ProjectsDetail/ProjectsDetail.jsx"
import ClientsDetail from "./pages/Clients/ClientsDetail/CLientsDetail.jsx"
import { dataGridCustomizations } from './theme/customizations/dataDisplay.jsx';
import { datePickersCustomizations } from './theme/customizations/datePickers.jsx';
import { treeViewCustomizations } from './theme/customizations/TreeView.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.scss";



function App(props) {
  return (
    <BrowserRouter>
     <AppTheme {...props}>
      <CssBaseline enableColorScheme />
        <SideMenu />
        <AppNavbar />
        <Header />
  
    <Routes>

    <Route 
    path='/' 
    element={<Start />} />
 
    <Route 
    path='/assets' 
    element={<DesignAssets />} />

    <Route 
    path='/clients' 
    element={<Clients />} />

    <Route 
    path='/projects' 
    element={<Projects />} />
    <Route 
    path='/analytics' 
    element={<Analytics />} />

    <Route 
    path='/projects/:idFromParams' 
    element={<ProjectsDetail />} />

    <Route 
    path='/clients/:idFromParams' 
    element={<ClientsDetail />} />
      </Routes>

    </AppTheme>
    </BrowserRouter>
  );
}

export default App;
