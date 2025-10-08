"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Input from "@/components/textfield/Input";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import { IPhones } from "@/utils/custom-types";
import Footer from "@/components/footer/Footer";

const cards = [
  {
    _id: 1,
    title: 'Mobifone',
    email: 'cskh@mobifone.vn',
    phone: 'Gọi 1800 1090'
  },
  {
    _id: 2,
    title: 'Viettel',
    email: 'cskh@viettel.com.vn',
    phone: 'Gọi 1800 8098'
  },
  {
    _id: 3,
    title: 'Gửi SMS có số điện thoại',
    syntax: 'V [số điện thoại] nội dung tin nhắn rác / gọi rác',
    phone: 'Gửi 156'
  },
  {
    _id: 4,
    title: 'Gửi SMS bị ẩn số điện thoại',
    syntax: 'S [Nguồn phát tán] [Nội dung tin nhắn rác]',
    phone: 'Gửi 156'
  }
];

export default function Home() {
  const [notification, setNotification] = useState<IPhones[] | undefined>(undefined);
  const [showMessage, setShowMessage] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>(" ");
  const [open, setOpen] = useState<boolean>(false);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
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
      return;
    }
    setStatusSearch(false);
    const found = notification?.length && notification.find((item: IPhones) => item.phone.includes(text));

    if (found) {
      setShowMessage(found.message);
      setStatusSearch(true);
    } else {
      setShowMessage('Không tìm thấy dữ liệu!');
      setStatusSearch(false);
    }
  }

  function onChangeTextSearch(text: string): void {
    setTextSearch(text.trim());
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
              onClick={() => onSearch(textSearch)}>
              <SearchIcon />
            </Button>
          </div>
          <main className={styles.main}>
            <div className={styles.recommendUser}>
              <Box component="section" sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.12)' }}>
                <h3>Liên hệ nhà mạng</h3>
                <Stack spacing={2}>
                  {cards.map((card) => (
                    <div className={styles.card} key={card._id}>
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
                </Stack>
                <div className={styles.buttonEmail}>
                  <Button variant="outlined" onClick={() => setOpen(true)}>Xem mẫu email</Button>
                </div>
              </Box>
              <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                {showMessage && <p>{showMessage}</p>}
                {statusSearch == true && showMessage != "Không tìm thấy dữ liệu!" && (
                  <Alert severity="warning">
                    <AlertTitle>Cảnh báo</AlertTitle>
                    <ul className={styles.notes}>
                      <li>1.Không gọi lại sau khi nhận cuộc gọi nhá máy từ số này.</li>
                      <li>2.Cần chặn số điện thoại để ngăn chặn cuộc gọi làm phiền trong tương lai.</li>
                      <li>3.Nếu thấy có dấu hiệu lừa đảo, nên báo cáo cho nhà mạng để có biện pháp can thiệp kịp thời.</li>
                    </ul>
                  </Alert>
                )}
              </Box>
            </div>
          </main>
          <Footer/>
        </div>
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
