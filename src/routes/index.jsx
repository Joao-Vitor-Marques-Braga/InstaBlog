import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import { CreatePost } from '../pages/CreatePost';
import TabBar from '../components/TabBar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';

export default function ApplicationRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path='/user/:userId' element={<UserProfile/>}/>
      </Routes>
      <TabBar />
    </BrowserRouter>
  );
}
