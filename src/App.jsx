
import { Outlet } from 'react-router-dom'
import NavbarMain from './all-components/navbar/NavbarMain'
import TopMiniNav from './all-components/top-mini-navbar/TopMiniNav'
import './App.css'
import Footer from './all-components/footer-page/Footer'

function App() {
  

  return (
    <>
      <div>
        <TopMiniNav></TopMiniNav>
        <NavbarMain></NavbarMain>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
