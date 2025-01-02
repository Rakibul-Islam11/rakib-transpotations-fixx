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
import LocationSlec from './all-components/Home-page/inner-pages/location-selct-section/LocationSlec.jsx';
import BusSelect from './all-components/seat-select-page/BusSelect.jsx';


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
        path: '/',//মনে রাখবেন home page এর জন্য path / এভাবে দিবেন কোনো নাম দিবেন না
        element: <HomePage></HomePage>
      },
      {
        path: 'bus-select',//not main nav menu's page
        loader: () => fetch('locationRoute&Fare.json'),
        element: <BusSelect></BusSelect>
      },
      {
        path: 'locationSlec', //not main nav menu's page
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