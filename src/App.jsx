
import { Outlet } from 'react-router-dom'
import NavbarMain from './all-components/navbar/NavbarMain'
import TopMiniNav from './all-components/top-mini-navbar/TopMiniNav'
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <TopMiniNav></TopMiniNav>
        <NavbarMain></NavbarMain>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
