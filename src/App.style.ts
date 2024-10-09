import { Grid2 } from "@mui/material";
import styled from "styled-components";

export const ContainerApp = styled(Grid2)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
`;

export const FirstContent = styled(Grid2)`
  text-align: center;
  color: #00a36c;
  font-size: 70px;
  font-family: Ubuntu, Roboto;
  font-weight: 800;
`;

export const SecondContent = styled(Grid2)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .GroupButtons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const ThirdContent = styled(Grid2)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 5;
`;
