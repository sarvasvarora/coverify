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
