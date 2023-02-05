import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { useCallback } from 'react'

const inter = Inter({ subsets: ['latin'] })

import React from "react";
import LoginButton from '../buttons/loginButton'

export default function Header({ darkMode, setDarkMode }) {
    return (
        <div>
            <nav className="bg-[#87cefa] p-10 shadow-lg flex justify-between items-center dark:bg-indigo-900">
                {/* LOGO */}
                <div className='flex items-center gap-4'>
                    <Image src="/images/CoverifyIcon.png" width={60} height={80}/>
                    <h1 className="font-Montserrat font-bold text-3xl dark:text-white">Coverify.ai</h1>
                </div>
                <div>
                    
                </div>
                {/* MENU ITEMS */}
                <ul className="flex justify-between gap-10 items-center">
                    <li>
                        <BsFillMoonStarsFill onClick={() => {setDarkMode(!darkMode) }}
                        className="cursor-pointer text-2xl"/>
                    </li>
                    <li> <LoginButton/> </li>
                </ul>
            </nav>
        </div>
    )
}