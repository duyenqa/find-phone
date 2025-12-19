import { useTheme } from "@/context/ThemeContext";
import styles from "./footer.module.css";

export default function Footer() {
    const { theme } = useTheme();
    return (
        <div className={`${styles.footer} ${styles[theme]}`}>
            <p className={styles.textFooter}>
                Bản quyền &copy; của Ngô Thị Kim Duyên 2025 - {new Date().getFullYear()}
            </p>
        </div>
    );
}
