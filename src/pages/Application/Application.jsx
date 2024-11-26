import React, { useState ,useEffect} from 'react'
import Bar from './Components/Bar'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Chat from './Pages/Chat'
import Map from './Pages/Map'
import Shop from './Pages/Shop'
import { Routes, Route, Navigate} from 'react-router-dom';
import AlertBar from '../../Components/AlertBar'

function Application() {
  const [open , setOpen] = useState(false)
  const [message , setMassage] = useState("")
  const [type, setType] = useState("Error")
  const [location , setLocation] = useState([])

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const { latitude, longitude } = position.coords;
                setLocation([latitude,longitude]) 
          },
            (error) => {
                console.error("Geolocation error:", error);
            }
        );
    }
}, []);
  return (
    <div>
      <Bar setMassage = {setMassage} setType = {setType} setOpen = {setOpen} />
      <div>
      <Routes>
        <Route path="/" element={<Navigate to="/Application/Home" />} />
        <Route
          path="Home"
          element={
            location&&<Home location={location} />
          }
        />
        <Route
          path="Chat"
          element={
            <Chat
            />
          }
        />
        <Route
          path="Map"
          element={
            location&&
            <Map
              location = {location}
            />
          }
        />
        <Route
          path="Cart"
          element={
            <Cart
            />
          }
        />
        <Route
          path="Shop"
          element={
            <Shop
            />
          }
        />
      </Routes>
      </div>
      <AlertBar open = {open} message = {message} type = {type} setOpen={()=>setOpen(false)}/>
    </div>
  )
}
export default Application
