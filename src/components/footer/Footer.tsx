import { useTheme } from "@/context/ThemeContext";
import styles from "./footer.module.css";

export default function Footer() {
    const { theme } = useTheme();
    return (
        <section className={`${styles.footer} ${styles[theme]}`}>
            <p>
                Bản quyền &copy; của Ngô Thị Kim Duyên
            </p>
            <p>
                2025 - {new Date().getFullYear()}
            </p>
        </section>
    );
}
