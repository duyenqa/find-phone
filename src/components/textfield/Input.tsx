import { useTheme } from "@/context/ThemeContext";
import { TextField } from "@mui/material";

interface IProps {
   handleChangeText: (text: string) => void;
   filterData: (text: string) => void;
}

const Input:React.FC<IProps> = ({handleChangeText, filterData}) => {
   const { theme } = useTheme();

   return <TextField
      color="primary" 
      focused
      fullWidth 
      label="Nhập số điện thoại cần tìm..."
      id="fullWidth"
      size="small"
      onChange={(e) => handleChangeText(e.target.value)}
      required
      autoComplete="off"
      onKeyDown={(event) => {
         if (event.key === 'Enter') {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            filterData(target.value);
         }
      }}
      sx={{
        input: {
          color: theme == 'dark' ? 'white' : 'black'
        }
      }}
   />;
};

export default Input;