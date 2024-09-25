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
import Blog from './pages/Clients/Clientele';
import Start from "./pages/Start/Start";
import Clients from './pages/Clients/Clients';
import DesignAssets from "./pages/DesignAssets/DesignAssets";
import Analytics from './pages/Analytics/Analytics.jsx'
import ProjectsDetail from "./pages/Projects/ProjectsDetail/ProjectsDetail.jsx"
import AddProject from './pages/Projects/AddProject/AddProject.jsx';
import ClientsDetail from "./pages/Clients/ClientsDetail/ClientsDetail.jsx"
import AddClient from "./pages/Clients/AddClient/AddClient.jsx"
import { dataDisplayCustomizations } from './theme/customizations/dataDisplay.jsx';
import { datePickersCustomizations } from './theme/customizations/datePickers.jsx';
import { treeViewCustomizations } from './theme/customizations/TreeView.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.scss";
import AssetsDetail from './pages/DesignAssets/AssetsDetail/AssetsDetail.jsx';
import DeleteProject from './components/DeleteProject/DeleteProject.jsx';
import TasksDetail from './pages/Tasks/Tasks.jsx';
import EditProjectPage from './pages/Projects/ProjectsDetail/EditProject/EditProject.jsx';
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
    path='/blog' 
    element={<Blog />} />

    
    <Route 
    path='/projects/:idFromParams' 
    element={<ProjectsDetail />} />

    <Route 
    path='/projects/:idFromParams/delete' 
    element={<DeleteProject />} />

    <Route 
    path='/projects/:idFromParams/edit' 
    element={<EditProjectPage />} />

    <Route 
    path='/projects/add'
    element={<AddProject />} />

    <Route 
    path='/tasks/:idFromParams'
    element={<TasksDetail />} />


    <Route 
    path='/analytics' 
    element={<Analytics />} />


    <Route 
    path='/clients/:idFromParams' 
    element={<ClientsDetail />} />
   
    <Route 
    path='/clients/add' 
    element={<AddClient />} />

    <Route 
    path='/assets/:idFromParams' 
    element={<AssetsDetail />} />

    <Route 
    path='/assets/edit' 
    element={<AssetsDetail />} />
      </Routes>

    </AppTheme>
    </BrowserRouter>
  );
}

export default App;
