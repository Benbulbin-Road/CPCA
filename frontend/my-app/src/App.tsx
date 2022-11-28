import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Home from './Screens/Home';
import Users from './Screens/Users';
import List from './Screens/List';
import { Button } from '@mui/material';
import './App.css';

function App() {
  let navigate = useNavigate();

  return (
      <div className='App'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                CoolPlanet
              </Typography>
              <Button 
                color="inherit"
                onClick={() => navigate("/")}
              >
                  Home
              </Button>
              <Button 
                color="inherit"
                onClick={() => navigate("/users")}
              >
                All Users
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to='/users' replace />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/:id" element={<Users/>} />
        </Routes>
      </div>
  );
};

export default App;