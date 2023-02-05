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


export default function Generate() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>
    <main>
        <section className="bg-[#87cefa] px-60 py-10 dark:bg-indigo-900 dark:text-white">
          <h1 className="py-2 font-Montserrat font-bold text-4xl dark:text-white">Step 1: Select Playlist</h1>
          <h3 className="font-Montserrat text-lg">Select your spotify playlist here! Reload the page for more iterations</h3>
        </section>

        <section className="bg-[#87cefa] px-60 py-10 dark:bg-indigo-900">
          <h1 className="py-2 font-Montserrat font-bold text-4xl dark:text-white">Step 2: Download your Cover!</h1>
          <h3 className="font-Montserrat text-lg dark:text-white">Click on the button below to download your cover.</h3>
          <div className="flex justify-center p-10"> 
            <Sketch1 /> 
          </div>
        </section>

      </main>
    </div>
  )
}
