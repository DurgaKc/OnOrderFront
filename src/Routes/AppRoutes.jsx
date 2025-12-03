import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from '../Layout/UserLayout'
import Home from '../pages/UserPages/Home'
import AdminLayout from '../Layout/AdminLayout'
import ContactUs from '../pages/UserPages/ContactUs'
import Categories from '../pages/UserPages/Order/Category'
import Order from '../pages/UserPages/Order/Order'
import Beverages from '../pages/UserPages/Order/Categories/Beverages'
import AdminHome from '../pages/adminPages/Home'
import PasswordChange from '../pages/adminPages/admin/PasswordChange'
import Orders from '../pages/adminPages/Orders'
import AddItems from '../pages/adminPages/admin/AddItems'
import ItemTablePage from '../pages/adminPages/admin/itemLists/ItemLists'
import ItemTable from '../pages/adminPages/admin/itemLists/ItemTable'
import UserProfile from '../pages/adminPages/admin/UserProfile'
import Appetizers from '../pages/UserPages/Order/Categories/Appetizers'
import Desserts from '../pages/UserPages/Order/Categories/Desserts'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserLayout/>}>
         <Route index element={<Home/>}/>
         <Route path='/contactUs' element={<ContactUs/>}/>
         <Route path='/category' element={<Categories/>}/>
         <Route path='/order' element={<Order/>}/>
         <Route path='/category/beverages' element={<Beverages/>}/>
         <Route path='/category/appetizers' element={<Appetizers/>}/>
         <Route path='/category/desserts' element={<Desserts/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
         <Route index element={<AdminHome/>}/>
         <Route path='password-change' element={<PasswordChange/>}/>
         <Route path='add-items' element={<AddItems/>}/>
         <Route path='orders' element={<Orders/>}/>
         <Route path='item-lists' element={<ItemTablePage/>}/>
         <Route path='item-lists/:category' element={<ItemTable/>}/>
         <Route path='user-profile' element={<UserProfile/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes