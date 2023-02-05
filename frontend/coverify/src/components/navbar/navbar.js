import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { useCallback } from 'react'

const inter = Inter({ subsets: ['latin'] })

import React from "react";

export default function Header({ darkMode, setDarkMode }) {
    return (
        <div>
            <nav className="p-10 shadow-lg flex justify-between items-center">
                {/* LOGO */}
                <div>
                    <Image src="/images/CoverifyLogo.png" width={200} height={80}/>
                </div>
                {/* MENU ITEMS */}
                <ul className="flex justify-between gap-10">
                    <li>
                        <BsFillMoonStarsFill onClick={() => {setDarkMode(!darkMode)}}
                        className="cursor-pointer text-2xl"/>
                    </li>
                    <li>Login</li>
                </ul>
            </nav>
        </div>
  )
}