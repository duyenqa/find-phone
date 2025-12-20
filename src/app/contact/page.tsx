"use client"
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import TextInput from "@/components/inputs/TextInput";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import Navbar from "@/components/navbar/Navbar";
import { toast } from 'react-toastify';
import styles from "./contact.module.css";
import Footer from './../../components/footer/Footer';

export default function contact() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorFetchData, setErrorFetchData] = useState<string | null>(null);

  const { theme } = useTheme();

  const onChangeName = (text: string) => {
    setErrorName("");
    setName(text);
  }

  const onChangeDescription = (text: string) => {
    setErrorDescription("");
    setDescription(text);
  }

  const onSubmit = async () => {
    if (!name.trim() && !description.trim()) {
      setErrorName('Không được để trống!!!');
      setErrorDescription('Không được để trống!!!');
      return;
    } else if (!name.trim() && description.length <= 300) {
      setErrorName('Không được để trống!!!');
      return;
    } else if (!description.trim() && name.length <= 20) {
      setErrorDescription('Không được để trống!!!');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorFetchData(data.error || 'Failed to send email.');
      } else {
        toast.success("Gửi email thành công!");
        setName(" ");
        setDescription(" ");
      }
    } catch (error) {
      toast.warning("Gửi email thất bại!!!")
      console.error('Error submitting form:', error);
      setErrorFetchData('An unexpected error occurred.');
    }

    setErrorFetchData(null);
    setName(" ");
    setDescription(" ");
  }

  return (
    <>
    <Navbar />
      <section className={`${styles.pageContact} ${styles[theme]}`}>
        <div className={styles.wrapper}>
          <div className={styles.headingBox}>
            <h1 className={`${styles.title} ${styles[theme]}`}>Trang liên hệ</h1>
          </div>
          <div className={styles.form}>
            <TextInput
              textLabel="Nhập tên của bạn"
              numberRows="1"
              text={name}
              handleChangeText={onChangeName}
              mandatory={true}
            />
            {errorName && (<p className={styles.errorMessage}>{errorName}</p>)}
            <TextInput
              textLabel="Nhập nội dung của bạn"
              numberRows="2"
              text={description}
              handleChangeText={onChangeDescription}
              mandatory={true}
            />
            {errorDescription && (<p className={styles.errorMessage}>{errorDescription}</p>)}
            <ButtonSubmit handleSubmit={onSubmit} />
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}