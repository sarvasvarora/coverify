import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import React from "react";
import Header from "../components/navbar/navbar"
import Sketch1 from "../components/sketches/sketch1"


export default function Home() {
  return (
    <>
      <Header />
      <Head>
        <title>Coverify.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-green-300 p-60">
        <section className="min-h-screen">
          <h1 className="py-2 font-MontrealNeue font-bold text-6xl">Create beautiful playlist covers within minutes.</h1>
          <h3 className="font-Montserrat text-lg">A paragraph.</h3>
        {/* <div className="bg-green-400">
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <Sketch1 />
        </div> */}
        </section>
      </main>
    </>
  )
}
