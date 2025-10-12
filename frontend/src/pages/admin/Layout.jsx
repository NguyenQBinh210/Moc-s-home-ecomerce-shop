import React from 'react'
import Sidebar from '../../components/ui/Sidebar'
import { Outlet } from 'react-router'

const LayoutAdmin = () => {
  return (
    <Sidebar>
      <Outlet/>
    </Sidebar>
  )
}
export default LayoutAdmin;
