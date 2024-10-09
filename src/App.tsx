import "./App.css";
import React, { useEffect, useState } from "react";

// material ui
import LetterCard from "./components/card/LetterCard";
import { Box, Button, CircularProgress, Grid2, TextField } from "@mui/material";

// redux
import { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
// slice
import {
  addLetter,
  findWord,
  getWordsLocalStorage,
  removeWord,
  saveWordLocalStorage,
} from "./redux/slice/wordsSlice";

// services
import { getPhrases } from "./services/getPhrases";
import {
  ContainerApp,
  FirstContent,
  SecondContent,
  ThirdContent,
} from "./App.style";

interface IArrayPhrases {
  phrases: Array<string>;
}

interface IFormState {
  inputSearch: string;
  inputAdd: string;
}

function App() {
  const { listWords, wordsFinded } = useSelector(
    (state: RootState) => state.wordsList
  );
  const dispatch = useDispatch();

  const [arrayPhrases, setArrayPhrases] = useState<IArrayPhrases>({
    phrases: [],
  });
  const [loadPage, setLoadPage] = useState(true);
  const [formState, setFormState] = useState<IFormState>({
    inputSearch: "",
    inputAdd: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false);
    }, 1500);

    // axios
    getPhrases()
      .then((res) => {
        setArrayPhrases(res);
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    dispatch(getWordsLocalStorage(arrayPhrases.phrases));
  }, [arrayPhrases]);

  return loadPage ? (
    <Box textAlign={"center"} mt={5}>
      <CircularProgress />
    </Box>
  ) : (
    <ContainerApp container spacing={2}>
      <FirstContent size={12}>
        <span>ENTREPALABRAS</span>
      </FirstContent>
      {/* Formulario */}
      <SecondContent container size={{ xs: 10 }}>
        <Grid2 size={{ lg: 6, xs: 12 }}>
          <TextField
            fullWidth
            label="Buscá tu frase ó palabra"
            id="inputSearch"
            name="inputSearch"
            variant="filled"
            value={formState.inputSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(findWord(e.target.value));
              setFormState({
                ...formState,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ lg: 6, xs: 12 }} container className={"GroupButtons"}>
          <Grid2 size={{ lg: 8, xs: 12 }}>
            <TextField
              fullWidth
              label="Agregá una frase ó palabra"
              id="inputAdd"
              variant="filled"
              name="inputAdd"
              value={formState.inputAdd}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Grid2>
          <Grid2 size={{ lg: 4, xs: 12 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                if (formState.inputAdd.length > 0) {
                  dispatch(addLetter(formState.inputAdd));
                  dispatch(saveWordLocalStorage());
                  setFormState({
                    inputAdd: "",
                    inputSearch: "",
                  });
                } else {
                  alert("Debes agregar una letra");
                }
              }}
            >
              Agregar a la lista
            </Button>
          </Grid2>
        </Grid2>
      </SecondContent>
      {/* Card Container */}
      <ThirdContent container size={12}>
        {(listWords.length === 0 && wordsFinded.length === 0) ||
        (wordsFinded.length === 0 && formState.inputSearch.length > 0) ? (
          <Box textAlign={"center"} style={{ color: "gray" }}>
            <h1>No hay frases disponibles</h1>
            <h2>Agregá una frase a la lista</h2>
          </Box>
        ) : formState.inputSearch.length > 0 && wordsFinded.length >= 0 ? (
          wordsFinded.map((item, index) => (
            <Grid2 key={index} size={{ lg: 2, xs: 12 }}>
              <LetterCard
                letter={item}
                onClick={() => {
                  dispatch(removeWord(item));
                  dispatch(saveWordLocalStorage());
                  formState.inputSearch = "";
                }}
              />
            </Grid2>
          ))
        ) : (
          listWords.map((item, index) => (
            <Grid2 key={index} size={{ lg: 2, xs: 12 }}>
              <LetterCard
                letter={item}
                onClick={() => {
                  dispatch(removeWord(item));
                  dispatch(saveWordLocalStorage());
                }}
              />
            </Grid2>
          ))
        )}
      </ThirdContent>
    </ContainerApp>
  );
}

export default App;
