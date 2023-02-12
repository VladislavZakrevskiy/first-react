import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Profile from "../pages/Profile";
import AvatarPhoto from '../assets/photo.jpg'
import Reg from '../pages/Reg'



export const  privateRoutes = [
    {path: '/about', element: <About/>, exact:false },
    {path: '/posts', element: <Posts/>, exact:true },
    {path: '*', element: <Error/>, exact:false },
    {path: '/posts/:id', element: <PostIdPage/>, exact:true },
    {path: '/profile', element: <Profile 
        
        src = {AvatarPhoto}
        value = {{username: "Влад Закревский"}}
        info={{
            address: 'Знаменск',
            telephone: '899963062057',
            date: '16.03.2006',
            online: 'online',
            email: 'zakrevskiyvlada@yandex.ru'
        }}/>, 
    exact:false },
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: false},
    {path: '/registration', element: <Reg/>, exact: false},
    {path: '*', element: <Login/>, exact: false}
]