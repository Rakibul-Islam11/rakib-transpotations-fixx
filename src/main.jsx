import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './all-components/Home-page/HomePage.jsx';
import AboutUs from './all-components/about-us-page/AboutUs.jsx';
import ServicePgae from './all-components/service-page/ServicePgae.jsx';
import ContactUsPgae from './all-components/contact-us-page/ContactUsPgae.jsx';
import TicketCancelPage from './all-components/ticket-cancel-page/TicketCancelPage.jsx';
import AlbumPgae from './all-components/album-page/AlbumPgae.jsx';
import LocationSlec from './all-components/Home-page/inner-pages/LocationSlec.jsx';

// HomePage এর জন্য loader ফাংশন
// const homePageLoader = async () => { //(১)
//   try {
//     // API থেকে ডাটা ফেচ করুন
//     const leavingCitiesResponse = await fetch('http://localhost:3000/LeavingCities');
//     const depurtingCitiesResponse = await fetch('http://localhost:3000/DepurtingCities');

//     // JSON ডাটা রূপান্তর করুন
//     const leavingCities = await leavingCitiesResponse.json();
//     const depurtingCities = await depurtingCitiesResponse.json();

//     // ডাটা রিটার্ন করুন
//     return { leavingCities, depurtingCities };
//   } catch (error) {
//     // কোনো API তে সমস্যা হলে খালি ডাটা রিটার্ন করুন
//     console.error('Failed to fetch data:', error);
//     return { leavingCities: [], depurtingCities: [] };
//   }
// };

// রাউটারে যুক্ত করা
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        loader: () => fetch('Locations.json'),
        element: <HomePage></HomePage>,
      },
      {
        path: 'locationSlec',
        element: <LocationSlec></LocationSlec>
      },
      {
        path: 'about-us',
        element: <AboutUs></AboutUs>,
      },
      {
        path: 'service',
        element: <ServicePgae></ServicePgae>,
      },
      {
        path: 'contact-us',
        element: <ContactUsPgae></ContactUsPgae>,
      },
      {
        path: 'ticket-cancel',
        element: <TicketCancelPage></TicketCancelPage>,
      },
      {
        path: 'album',
        element: <AlbumPgae></AlbumPgae>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);


// (1) ==> এখানে আমরা একসাথে দুইটা api call করতে হয়েছে তাই সরাসরি router এর মদ্ধে lkoader এর মাদ্ধমে inline api call করতে পারিনি এখত্তে এমন multiple api fetch করতে আপনাকে এইভাবে এটা আগে উপরে একটা fn এর মদ্ধে করে নিতে হবে তারপরে আপনি সেই fn কে  সরাসরই router loader এর মদ্ধে apply করে দিন সেইম কাজ করবে