import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import React from "react";



export default function Header() {
  return (
    <div>
        <nav className="p-10 shadow-lg flex justify-between items-center">
            {/* LOGO */}
            <div>
                <Image src="/images/CoverifyLogo.png" width={200} height={80}/>
            </div>
            <ul className="flex-items-center">
                <li>Login</li>
            </ul>
        </nav>
    </div>
  )
}