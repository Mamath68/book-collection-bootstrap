import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import styles from "./page.module.css";
import {ReactNode} from "react";
import Navbar from "@/app/navbar";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ma Collection de Livres",
    description: "Collection de Livres",
};

export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header aria-hidden={true}>
            <Navbar/>
        </header>
        <div className={styles.page}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}
