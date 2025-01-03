
import { Outlet, ScrollRestoration } from 'react-router-dom'
import NavbarMain from './all-components/navbar/NavbarMain'
import TopMiniNav from './all-components/top-mini-navbar/TopMiniNav'
import './App.css'
import Footer from './all-components/footer-page/Footer'

function App() {
  

  return (
    <>
      <div>
        
        <ScrollRestoration></ScrollRestoration>
        <TopMiniNav></TopMiniNav>
        <NavbarMain></NavbarMain>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App

  //  এটা ScrollRestoration use করা হয়েছে কারন route use করে আপনি another page এ গেলে screen top সাইড থেকে দেখাই না ব্রং সে পূর্বের scroll position এ দেখায় এটা prevent করেতে এটা use করা হয়েছে