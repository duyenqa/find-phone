"use client"
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/navbar/Navbar";
import styles from "./about.module.css";

export default function about() {
    const { theme } = useTheme();

    return (
        <section className={`${styles.pageAbout} ${styles[theme]}`}>
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.headingBox}>
                    <h1 className={`${styles.text} ${styles[theme]}`}>Trang về tôi</h1>
                </div>
                <div className={styles.boxAbout}>
                    <p className={`${styles.text} ${styles[theme]}`}>Ứng dụng Find Phone có giao diện thân thiện, dễ sử dụng, miễn phí cho cộng đồng người dùng trong Việt Nam.</p>
                    <p className={`${styles.text} ${styles[theme]}`}>
                        Phiên bản: 2.0 - 2025 - {new Date().getFullYear()}
                    </p>
                    <p className={`${styles.text} ${styles[theme]}`}>
                        Tác giả bản quyền: Ngô Thị Kim Duyên
                    </p>
                </div>
            </div>
        </section>
    )
}