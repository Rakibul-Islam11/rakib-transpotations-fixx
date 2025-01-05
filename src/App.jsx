
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
        <div className='w-[96%] md:w-10/12 mx-auto shadow-[0_12px_15px_1px_rgba(0,0,0,1)]'>
          <TopMiniNav></TopMiniNav>
          <NavbarMain></NavbarMain>
        </div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App

//  এটা ScrollRestoration use করা হয়েছে কারন route use করে আপনি another page এ গেলে screen top সাইড থেকে দেখাই না ব্রং সে পূর্বের scroll position এ দেখায় এটা prevent করেতে এটা use করা হয়েছে
  
//এখানে এর মদ্ধে এক সাথে দুইটা compo এর মদ্ধে এক সাতেহ shadow apply করতে পারি এজন্য এখানে div দিয়ে wraping করা হয়েছে