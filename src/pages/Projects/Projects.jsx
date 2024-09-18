import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../../components/AppNavBar/AppNavBar.jsx';
import Header from '../../components/Header/Header.jsx';
import MainGrid from '../../components/MainGrid/MainGrid.jsx';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import AppTheme from '../../shared-theme/AppTheme.jsx';
import { chartsCustomizations } from '../../theme/customizations/charts.jsx';
import { dataGridCustomizations } from '../../theme/customizations/dataDisplay.jsx';
import { datePickersCustomizations } from '../../theme/customizations/datePickers.jsx';
import { treeViewCustomizations } from '../../theme/customizations/TreeView.jsx';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}