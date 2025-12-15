"use client"
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { IPhones } from "@/utils/custom-types";
import { cards, introduceText01, introduceText02, phonesSpam } from "@/utils/constant";
import { useTheme } from "@/context/ThemeContext";
import Input from "@/components/textfield/Input";
import Footer from "@/components/footer/Footer";
import ShareApps from "@/components/share/ShareApps";
import { Alert, AlertTitle, Box, Button, Chip, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import styles from "./page.module.css";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [notification, setNotification] = useState<IPhones[] | undefined>(undefined);
  const [showMessage, setShowMessage] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>(" ");
  const [statusSearch, setStatusSearch] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(" ");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const fetchPhoneNumbers = async () => {
    const { data, error } = await supabase
      .from('phones')
      .select('*')

    if (error) console.error('Lỗi:', error);
    else setNotification(data);
  }

  useEffect(() => {
    fetchPhoneNumbers();
  }, [])

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

  function handleSelectedCard(index: number) {
    setSelectedCard(index);
  }

  return (
    <section className={`${styles.page} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <Chip
            label={theme === 'light' ? 'Sáng' : 'Tối'}
            icon={theme === 'light' ? <WbSunnyOutlinedIcon /> : <Brightness2OutlinedIcon />}
            color="primary"
            onClick={toggleTheme}
            variant="outlined"
            size="medium"
          />
        </div>
        <Paper elevation={0}>
          <div className={styles.searchBar}>
            <Input
              handleChangeText={onChangeTextSearch}
              filterData={onSearch}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={() => onSearch(textSearch)}
            >
              <SearchIcon />
            </Button>
          </div>
        </Paper>
        <main className={styles.main}>
          <div className={styles.recommendUser}>
            <Box component="section" sx={{ my: '1rem' }}>
              {showMessage && (
                <>
                  <Typography variant="h5" gutterBottom sx={{ color: theme === 'light' ? '#000' : '#fff' }}>Số điện thoại {textSearch.length < 4 ? textSearch : phone}</Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: theme === 'light' ? '#000' : '#fff' }}>{showMessage}</Typography>
                </>
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
            <Box component="section" sx={{ p: 2, my: 5, backgroundColor: '#D7BDE2' }}>
              <Typography variant="h5" gutterBottom sx={{ color: theme === 'light' ? '#000' : '#fff' }}>Cách nhận biết số rác / lừa đảo</Typography>
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
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: theme === 'light' ? '#000' : '#fff' }}
                  >
                    {introduceText01}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: theme === 'light' ? '#000' : '#fff' }}
                  >
                    {introduceText02}
                  </Typography>
                </div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2, backgroundColor: '#D7BDE2' }}>
              <div className={styles.introduceNumber}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: theme === 'light' ? '#000' : '#fff' }}
                >
                  Giới thiệu
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    color: theme === 'light' ? '#000' : '#fff',
                    width: '65%',
                    textAlign: 'center',
                    lineHeight: 2
                  }}
                >
                  Tổng đài 156 là đầu số miễn phí của Bộ Thông tin và Truyền thông, dùng để tiếp nhận phản ánh về cuộc gọi rác, tin nhắn rác và các cuộc gọi có dấu hiệu lừa đảo. Áp dụng toàn quốc, trên tất cả các nhà mạng di động và cố định.
                </Typography>
              </div>
              <div className={styles.cards}>
                {cards.map((card, index) => (
                  <div className={`${styles.card} ${selectedCard == index ? styles.activeCard : ''}`} key={card._id} onClick={() => handleSelectedCard(index)}>
                    <h4>{card.title}</h4>
                    {card.syntax && (
                      <p>
                        <span style={{ display: "inline-flex" }}><MessageIcon /> {card.syntax}</span>
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
            </Box>
          </div>
        </main>
        <Footer />
      </div>
      <ShareApps />
    </section>
  );
}
