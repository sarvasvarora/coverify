import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

import React from "react";
import Header from "../components/navbar/navbar"
import Sketch1 from "../components/sketches/sketch1"
import SecondaryButton from '@/components/secondaryButton'
import Generate from '@/components/generate'


// const setPermit = (e) => {
//   if (e.target.className.includes('mobile')) {
//       setPermit(true)
//   } else if (e.target.className.includes('desktop')){
//       setPermit(false)
//   }
// }

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [permit, setPermit] = useState(true) 
  // console.log("permit", permit);


  return (
    <div className={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Head>
        <title>Coverify.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-green-300 dark:bg-indigo-900">
        <section className="min-h-screen p-60">
          <h1 className="py-2 font-Montserrat font-bold text-6xl">Create beautiful playlist covers within minutes.</h1>
          <h3 className="font-Montserrat text-lg">A paragraph.</h3>
        <SecondaryButton />
        </section>



      {/* <div className={permit === false ? <Generate /> : 'remove-display'}></div>
     */}
  
     <div>{permit ? <Generate/> : null }</div>
   
      </main>
    </div>
  )
}
