import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import { CreatePost } from '../pages/CreatePost'
import TabBar from '../components/TabBar'

export default function AplicationRoutes(){

    return(
        <BrowserRouter>
            <NavBar/>
            
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/CreatePost" element={<CreatePost/>}/>
            </Routes>
            <TabBar/>
        </BrowserRouter>
    )
}