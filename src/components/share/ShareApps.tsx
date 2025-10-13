import { useState } from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    ViberShareButton,
    LineShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    ViberIcon,
    LineIcon
} from "react-share";
import styles from "./shareapps.module.css";
import { shareUrl } from "@/utils/constant";
import { Fab, Tooltip } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';


const ShareApps = () => {
    const [showApps, setShowApps] = useState(false);

    return (
        <div className={styles.shareApps}>
            {showApps == false ? null : <div className={styles.apps}>
                <Tooltip title="Facebook" placement="left">
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>
                </Tooltip>
                <Tooltip title="Twitter" placement="left">
                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>
                </Tooltip>
                <Tooltip title="Email" placement="left">
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon size={40} round={true} />
                    </EmailShareButton>
                </Tooltip>
                <Tooltip title="Viber" placement="left">
                    <ViberShareButton url={shareUrl}>
                        <ViberIcon size={40} round={true} />
                    </ViberShareButton>
                </Tooltip>
                <Tooltip title="Line" placement="left">
                    <LineShareButton url={shareUrl}>
                        <LineIcon size={40} round={true} />
                    </LineShareButton>
                </Tooltip>
                <Tooltip title="Whatsapp" placement="left">
                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                </Tooltip>
            </div>
            }
            <Fab aria-label="like" color="warning" onClick={() => setShowApps(!showApps)}>
                <ShareIcon />
            </Fab>
        </div>
    );
}
export default ShareApps;