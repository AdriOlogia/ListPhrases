// material ui
import Card from "@mui/material/Card";
import { CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProp {
  letter: string | number;
  onClick?: () => void;
}
const LetterCard = ({ letter, onClick }: IProp) => {
  return (
    <Card variant="elevation">
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
    </Card>
  );
};

export default LetterCard;
