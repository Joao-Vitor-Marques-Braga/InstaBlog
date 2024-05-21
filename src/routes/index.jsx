import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import { CreatePost } from '../pages/CreatePost'
import TabBar from '../components/TabBar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PrivateRoutes from './PrivateRoutes'
import Profile from '../pages/Profile'

export default function AplicationRoutes(){

    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path='/' element={<PrivateRoutes/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/CreatePost" element={<CreatePost/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Profile" element={<Profile/>}/>
            </Routes>
            <TabBar/>
        </BrowserRouter>
    )
}