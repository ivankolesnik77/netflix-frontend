import Head from 'next/head'
import styles from './layout.module.css'
import Menu from './navigation/menu'
import { FC, useEffect, useRef, useState } from 'react'
import Footer from './footer'

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import StoreProvider from '../../store/StoreProvider'

import localFont from 'next/font/local'
import LoginLayout from './LoginLayout'
import { RootState } from '../../store'
import { useRouter } from 'next/router'

interface IProps {
    children: React.ReactNode[] | React.ReactNode
}

const Layout: FC<IProps> = ({ children }) => {
    const router = useRouter()
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    if (router.route.includes('/watch')) {
        return children
    }

    if (!isAuth) {
        return <LoginLayout>{children}</LoginLayout>
    }

    return (
        <div>
            <div className="grid h-screen grid-rows-[min-content,1fr,300px] font-netflix text-white ">
                <Menu />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout
