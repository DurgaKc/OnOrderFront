import React from 'react'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
          <AdminNavbar/>
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
  )
}

export default AdminLayout