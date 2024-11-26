import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Make sure this function retrieves the token correctly
import { getToken ,deleteToken } from '../Cookies';

const PrivateRoute = ({ token, children }) => {
  const navigate = useNavigate()
  useEffect(()=>{
      if(getToken()===null){
        navigate('/Auth/')
      }
  })
  return (token.current!==null) ? children : <Navigate to="/Auth" />;
};

export default PrivateRoute