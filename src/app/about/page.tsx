"use client"
import { useTheme } from "@/context/ThemeContext";
import styles from "./about.module.css";
import Navbar from "@/components/navbar/Navbar";

export default function about() {
    const { theme } = useTheme();

    return (
        <section className={`${styles.pageAbout} ${styles[theme]}`}>
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.headingBox}>
                    <h1 className={`${styles.title} ${styles[theme]}`}>Trang về tôi</h1>
                </div>
                <div className={styles.boxAbout}>
                    <p className={`${styles.title} ${styles[theme]}`}>Hello World, Duyên</p>
                </div>
            </div>
        </section>
    )
}