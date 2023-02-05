import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

import React from "react";
import Header from "../components/navbar/navbar"
import Sketch1 from "../components/sketches/sketch1"
import SecondaryButton from '@/components/buttons/secondaryButton'


export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Head>
        <title>Coverify.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#87cefa] dark:bg-indigo-900">
        <section className="min-h-screen p-60">
          <h1 className="py-2 font-Montserrat font-bold text-6xl dark:text-white">Create beautiful playlist covers within minutes.</h1>
          <h3 className="py-5 font-Montserrat text-lg dark:text-white">A paragraph.</h3>
        <SecondaryButton />
        </section>
      </main>
    </div>
  )
}
