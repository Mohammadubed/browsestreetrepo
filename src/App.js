import './App.css';
import Auth from './pages/LoginForm/Auth';
import { BrowserRouter as Router ,Routes,Route,Navigate} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Application from './pages/Application/Application';
import { useRef, useState } from 'react';
import { getToken } from './Cookies';

function App() {
  const token = useRef(getToken())
  return (
    <Router className="App">
       <Routes>
       <Route path="/" element={<Navigate to="/Application/" />} />
        <Route
          path="/Application/*"
          element={
            <PrivateRoute token={token}>
              <Application />
              </PrivateRoute>  
          }
        />
        <Route path="/Auth/*" element={<Auth token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
