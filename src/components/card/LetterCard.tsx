// material ui
import { CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CardLetterContainer } from "./LetterCard.style";

interface IProp {
  letter: string | number;
  onClick?: () => void;
}
const LetterCard = ({ letter, onClick }: IProp) => {
  return (
    <CardLetterContainer variant="elevation">
      <CardHeader
        disableTypography={true}
        action={
          <IconButton
            aria-label="settings"
            onClick={() => onClick && onClick()}
          >
            <CloseIcon />
          </IconButton>
        }
        subheader={letter}
      />
    </CardLetterContainer>
  );
};

export default LetterCard;
