import { Card } from "@mui/material";
import styled from "styled-components";

export const CardLetterContainer = styled(Card)`
  height: 150px;
  .MuiCardHeader-root > .MuiCardHeader-content {
    max-height: 130px !important;
    box-sizing: border-box;
    overflow: auto;
  }
`;
