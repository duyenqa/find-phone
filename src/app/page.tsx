"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Input from "@/components/textfield/Input";
import Footer from "@/components/footer/Footer";
import { IPhones } from "@/utils/custom-types";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';

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

const phonesSpam = [
  {
    id: "9deb2995-e81b-4f0d-92c5-1aa46234cc9f",
    title: "Gọi liên tục / nhá máy từ các đầu số lạ trong thời gian ngắn"
  },
  {
    id: "d4381a58-3aab-4edf-bd31-748045196178",
    title: "Người gọi ép buộc cung cấp thông tin cá nhân"
  },
  {
    id: "bbc4f705-f6b4-4050-895f-ebd3be0a05f7",
    title: "Số lạ có tiền tố nước ngoài(059,...)"
  },
  {
    id: "90beb4ed-f02e-4d0f-8804-feff2c8bb724",
    title: "Kêu đăng ký, tặng tiền"
  },
  {
    id: "b3382319-dcae-42bb-9b57-3cd7e87f9c5d",
    title: "Sử dụng ngôn ngữ đe dọa, khẩn cấp"
  }
];

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
                <h3>Cách nhận biết số rác / lừa đảo</h3>
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
                    <p>
                      Số điện thoại rác, lừa đảo tồn tại vì lợi nhuận cao, chi phí thấp, công nghệ dễ lợi dụng và một phần do người dùng chưa cảnh giác đủ. Ở nhiều nước bao gồm Việt Nam vẫn còn khó kiểm soát hoàn toàn nguồn SIM rác, tổng đài ảo, phần mềm VoIP(Internet gọi điện)
                    </p>
                    <p>
                      Nhiều người vẫn tin vào lời nói qua điện thoại, nhất là khi người gọi nói giọng chính quyền, ngân hàng,...v.v Bọn chúng khai thác tâm lý sợ hãi hoặc ham lợi như trúng 100 triệu, bị khóa tài khoản, có người gửi hàng cho bạn,...v.v
                    </p>
                  </div>
                </div>
              </Box>
              <Box component="section" sx={{ p: 2, backgroundColor: '#a4d1d6' }}>
                <h3 className={styles.title}>Cách báo cáo & hành động</h3>
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
