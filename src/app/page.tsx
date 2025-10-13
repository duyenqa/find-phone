"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Input from "@/components/textfield/Input";
import Footer from "@/components/footer/Footer";
import { IPhones } from "@/utils/custom-types";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import ShareApps from "@/components/share/ShareApps";
import { cards, introduceText01, introduceText02, phonesSpam } from "@/utils/constant";

export default function Home() {
  const [notification, setNotification] = useState<IPhones[] | undefined>(undefined);
  const [showMessage, setShowMessage] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>(" ");
  const [open, setOpen] = useState<boolean>(false);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(" ");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data.json', {
          cache: "no-store",
        });
        const json = await res.json();
        setNotification(json.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }
    loadData();
  }, []);

  function onSearch(text: string) {
    if (!notification || notification.length === 0 || !text.trim()) {
      setShowMessage("Không tìm thấy dữ liệu!");
      setPhone(null);
      return;
    }
    setStatusSearch(false);
    const found = notification?.length && notification.find((item: IPhones) => item.phone.includes(text));

    if (found) {
      setShowMessage(found.message);
      setPhone(found.phone);
      setStatusSearch(true);
    } else {
      setShowMessage('Không tìm thấy dữ liệu!');
      setPhone(null);
      setStatusSearch(false);
    }
  }

  function onChangeTextSearch(text: string): void {
    setTextSearch(text.trim());
  }

  function handleSelectedCard(index:number) {
    setSelectedCard(index);
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles.searchBar}>
            <Input handleChangeText={onChangeTextSearch} />
            <Button
              variant="contained"
              size="medium"
              onClick={() => onSearch(textSearch)}
              >
              <SearchIcon />
            </Button>
          </div>
          <main className={styles.main}>
            <div className={styles.recommendUser}>
              <Box component="section" sx={{ marginBottom:'1rem' }}>
                {showMessage && (
                  <div>
                    <h3>Số điện thoại {textSearch.length < 4 ? textSearch : phone}</h3>
                    <p className={styles.contentInfo}>{showMessage}</p>
                  </div>
                )}
                {statusSearch == true && showMessage != "Không tìm thấy dữ liệu!" && (
                  <Alert severity="warning">
                    <AlertTitle>Cảnh báo</AlertTitle>
                      <li>1.Không gọi lại sau khi nhận cuộc gọi nhá máy từ số này.</li>
                      <li>2.Cần chặn số điện thoại để ngăn chặn cuộc gọi làm phiền trong tương lai.</li>
                      <li>3.Nếu thấy có dấu hiệu lừa đảo, nên báo cáo cho nhà mạng để có biện pháp can thiệp kịp thời.</li>
                  </Alert>
                )}
              </Box>
              <Box component="section" sx={{ p: 2, my: 5, backgroundColor: '#a4d1d6' }}>
                <Typography variant="h5" gutterBottom>Cách nhận biết số rác / lừa đảo</Typography>
                <div className={styles.list}>
                  <div className={styles.scrollVertical}>
                    <div className={styles.information}>
                      {phonesSpam.map((spam) => (
                        <div className={styles.contentThrief} key={spam.id}>
                          <p>{spam.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.introduce}>
                    <p>{introduceText01}</p>
                    <p>{introduceText02}</p>
                  </div>
                </div>
              </Box>
              <Box component="section" sx={{ p: 2, backgroundColor: '#a4d1d6' }}>
                <Typography variant="h5" gutterBottom>Cách báo cáo & hành động</Typography>
                <div className={styles.cards}>
                  {cards.map((card, index) => (
                    <div className={`${styles.card} ${selectedCard == index ? styles.activeCard : ''}`} key={card._id} onClick={() => handleSelectedCard(index)}>
                      <h4>{card.title}</h4>
                      {card.syntax && (
                        <p>
                          <span style={{ display: "inline-flex" }}><MessageIcon /> {card.syntax}</span>
                        </p>
                      )}

                      {card.email && (
                        <p>
                          <span style={{ display: "inline-flex" }}><EmailIcon /> {card.email}</span>
                        </p>
                      )}

                      {card.phone && (
                        <p>
                          <span style={{ display: "inline-flex" }}><PhoneIcon /> {card.phone}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.buttonEmail}>
                  <Button 
                    variant="contained"
                    size="medium" 
                    color="success"
                    onClick={() => setOpen(true)}>Xem mẫu email</Button>
                </div>
              </Box>
            </div>
          </main>
          <Footer/>
        </div>
        <ShareApps />
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              <strong>Tiêu đề email:</strong> Phản ánh số điện thoại nghi lừa đảo [số điện thoại]
            </p>
            <div>
              <p>Kính gửi [Tên nhà mạng],</p>
              Tôi tên là [Họ tên], số thuê bao [số của bạn]. Tôi muốn yêu cầu hỗ trợ tra cứu nguồn gốc / chặn số điện thoại [số điện thoại] do [lý do: quấy rối / nghi lừa đảo / quảng cáo không mong muốn]. Xin hướng dẫn thủ tục và thời gian xử lý.
              <p>Cảm ơn</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
