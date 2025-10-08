import { TextField } from "@mui/material";

interface IProps {
   handleChangeText: (text: string) => void;
}

const Input:React.FC<IProps> = ({handleChangeText}) => {
   return <TextField
      fullWidth 
      label="Tìm số điện thoại"
      id="fullWidth"
      size="small"
      onChange={(e) => handleChangeText(e.target.value)}
      required
      autoComplete="off"
   />;
};

export default Input;