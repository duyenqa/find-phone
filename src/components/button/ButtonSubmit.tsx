import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface IProps{
    handleSubmit: () => void;
}

const ButtonSubmit:React.FC<IProps> = ({handleSubmit}) => {
 return <Button
        variant="contained"
        startIcon={<SendIcon />}
        onClick={handleSubmit}
        >
        Gửi
    </Button>;
};

export default ButtonSubmit;