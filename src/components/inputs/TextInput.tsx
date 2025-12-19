import { ChangeEvent, FC } from "react";
import TextField from '@mui/material/TextField';

interface IProps {
    textLabel: string;
    numberRows: string;
    text: string;
    handleChangeText: (text: string) => void;
    mandatory: boolean;
}

const TextInput: FC<IProps> = ({textLabel, numberRows, text, handleChangeText, mandatory}) => {
 return <TextField
           id="outlined-multiline-flexible"
           label={textLabel}
           multiline
           maxRows={numberRows}
           size="medium"
           onChange={(event) => handleChangeText(event.target.value)}
           value={text}
           required={mandatory}
         />;
};

export default TextInput;