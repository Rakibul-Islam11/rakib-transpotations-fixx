import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './all-components/Home-page/HomePage.jsx';
import AboutUs from './all-components/about-us-page/AboutUs.jsx';
import ServicePgae from './all-components/service-page/ServicePgae.jsx';
import ContactUsPgae from './all-components/contact-us-page/ContactUsPgae.jsx';
import TicketCancelPage from './all-components/ticket-cancel-page/TicketCancelPage.jsx';
import AlbumPgae from './all-components/album-page/AlbumPgae.jsx';

// এখানে মাথায় রাখবেন এটা কিন্তু router নামেই ভেরিটা create করতে হবে।
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: 'about-us',
        element: <AboutUs></AboutUs>
      },
      {
        path: 'service',
        element: <ServicePgae></ServicePgae>
      },
      {
        path: 'contact-us',
        element: <ContactUsPgae></ContactUsPgae>
      },
      {
        path: 'ticket-cancel',
        element: <TicketCancelPage></TicketCancelPage>
      },
      {
        path: 'album',
        element: <AlbumPgae></AlbumPgae>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
