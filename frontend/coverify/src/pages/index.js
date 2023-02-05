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

      <main className="bg-green-300 dark:bg-indigo-900">
        <section className="min-h-screen p-60">
          <h1 className="py-2 font-Montserrat font-bold text-6xl">Create beautiful playlist covers within minutes.</h1>
          <h3 className="font-Montserrat text-lg">A paragraph.</h3>
        {/* <div className="bg-green-400">
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <Sketch1 />
        </div> */}
        <SecondaryButton />
        </section>

        <section className="bg-blue-50 px-60 py-10">
          <h1 className="py-2 font-Montserrat font-bold text-4xl">Step 1: Select Playlist</h1>
          <h3 className="font-Montserrat text-lg">Some text.</h3>
        </section>

        <section className="bg-blue-50 px-60 py-10">
          <h1 className="py-2 font-Montserrat font-bold text-4xl">Step 2: Download your Cover!</h1>
          <h3 className="font-Montserrat text-lg">Some text.</h3>
        </section>

      </main>
    </div>
  )
}
