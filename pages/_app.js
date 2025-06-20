// pages/_app.js
import '@/styles/globals.css';
import React from 'react';
import 'tailwindcss/tailwind.css';
import { TrackingProvider } from '../Context/TrackingContext';
import { Navbar, Footer } from '@/Components';

export default function App({ Component, pageProps }) {
  console.log("Rendering Component:", Component?.name);
  return (
    <TrackingProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </TrackingProvider>
  );
}
