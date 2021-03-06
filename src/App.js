import "./App.css";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import { solveCRT } from "./components/Computation";
import { showResult } from "./components/Result";
import Header from "./components/Header";
import background from "./bg.jpg";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "15ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

let datas = null;
function App() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { remainder: 3, modulo: 5 },
    { remainder: 5, modulo: 7 },
    { remainder: 7, modulo: 11 },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    datas = solveCRT(inputFields);
    showResult(datas, classes);
  };

  const handleChangeInput = (index, event) => {
    event.preventDefault();
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { remainder: 0, modulo: 0 }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    if (values.length !== 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${background})`,
    backgroundPosition:"center",
    backgroundAttachment:"fixed"
     }}>
      <Header />
      <Container className="container">
        <div className="instruction">
          <h3>Add equations you want to solve</h3>
        </div>
        <Grid
          container
          alignItems="stretch"
          direction="column"
          justify="space-around"
          spacing={3}
        >
          <Grid item xs={12} className="form-data">
            <form
              className={classes.root}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              {inputFields.map((inputField, index) => (
                <div key={index}>
                  <TextField
                    label="Remainder"
                    type="number"
                    name="remainder"
                    variant="outlined"
                    value={inputField.remainder}
                    required
                    onChange={(event) => handleChangeInput(index, event)}
                  />
                  <TextField
                    label="Modulo"
                    type="number"
                    name="modulo"
                    variant="outlined"
                    value={inputField.modulo}
                    required
                    onChange={(event) => handleChangeInput(index, event)}
                  />
                  <IconButton onClick={() => handleRemoveFields(index)}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleAddFields()}>
                    <AddIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
                onSubmit={handleSubmit}
              >
                Solve
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} id="result"></Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default App;