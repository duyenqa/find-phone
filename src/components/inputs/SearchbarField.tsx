import { TextField } from "@mui/material";

interface IProps {
   handleChangeText: (text: string) => void;
   filterData: (text: string) => void;
}

const SearchbarField: React.FC<IProps> = ({ handleChangeText, filterData }) => {
   return <TextField
      color="primary"
      fullWidth
      id="filled-search"
      label="Số điện thoại"
      type="search"
      placeholder="Nhập số điện thoại cần tìm..."
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
            color: '#000'
         }
      }}
   />;
};

export default SearchbarField;