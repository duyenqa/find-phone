import { Box } from "@mui/material";
import {
      EmailShareButton,
      FacebookShareButton,
      TwitterShareButton,
      WhatsappShareButton,
      FacebookIcon,
      TwitterIcon,
      WhatsappIcon,
      EmailIcon
} from "react-share";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <>
            <Box component="section" sx={{ p: 2, background: '#000', textAlign:'center', borderBottom:'1px solid #cacaca' }}>
                <p style={{color: '#fff'}}>
                    Bản quyền &copy; của Ngô Thị Kim Duyên 2025 - {new Date().getFullYear()}
                </p>
            </Box>
            <Box component="section" sx={{ p: 2, background: '#000' }}>
                <div className={styles.shareApps}>
                    <FacebookShareButton url="https://find-phone-sigma.vercel.app/">
                        <FacebookIcon size={32}/>
                    </FacebookShareButton>
                    <TwitterShareButton url="https://find-phone-sigma.vercel.app/">
                        <TwitterIcon size={32}/>
                    </TwitterShareButton>
                    <EmailShareButton url="https://find-phone-sigma.vercel.app/">
                        <EmailIcon size={32}/>
                    </EmailShareButton>
                    <WhatsappShareButton url="https://find-phone-sigma.vercel.app/">
                        <WhatsappIcon size={32}/>
                    </WhatsappShareButton>
                </div>
            </Box>
        </>
    );
}
