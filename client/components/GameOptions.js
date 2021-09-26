import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  gameOptions: {
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  innerRow: {
    alignItems: 'center',
  },
  borderYellow: {},
}));

/** COMPONENT **/
const GameOptions = () => {
  const classes = useStyles();
  const [roundTimeState, setRoundTimeState] = useState('60');
  const [numberOfRoundsState, setNumberOfRoundsState] = useState('3');
  const [numberOfWordsState, setnumberOfWordsState] = useState('10');

  const handleChangeRoudTime = (event) => {
    const selectedTime = event.target.value;
    setRoundTimeState(selectedTime);
    // console.log(selectedTime)
  };
  const handleChangeRoundNumber = (event) => {
    const selectedRoundNumber = event.target.value;
    setNumberOfRoundsState(selectedRoundNumber);
    // console.log(selectedRoundNumber)
  };
  const handleChangeWordNumber = (event) => {
    const selectedWordsNumber = event.target.value;
    setnumberOfWordsState(selectedWordsNumber);
    // console.log(selectedWordsNumber)
  };

  return (
    <Box className={classes.gameOptions}>
      <h2> Define Game Options </h2>
      <Grid container spacing={2} className={classes.innerRow}>
        <Grid item xs={6} md={6} p={4} className={classes.borderYellow}>
          Rounds Time
        </Grid>
        <Grid item xs={6} md={6} p={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="dropdown-native-simple"></InputLabel>
            <Select
              native
              labelId=""
              value={roundTimeState}
              onChange={handleChangeRoudTime}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <option aria-label="None" value="" />
              <option value={60}>1:00</option>
              <option value={90}>1:30</option>
              <option value={120}>2:00</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.innerRow}>
        <Grid item xs={6} md={6} p={4}>
          # of Rounds:
        </Grid>
        <Grid item xs={6} md={6} p={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="dropdown-native-simple"></InputLabel>
            <Select
              native
              value={numberOfRoundsState}
              onChange={handleChangeRoundNumber}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <option aria-label="None" value="" />
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.innerRow}>
        <Grid item xs={6} md={6} p={4}>
          Max # of words per player:
        </Grid>
        <Grid item xs={6} md={6} p={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="dropdown-native-simple"></InputLabel>
            <Select
              native
              value={numberOfWordsState}
              onChange={handleChangeWordNumber}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <option aria-label="None" value="" />
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Select>
          </FormControl>
        </Grid>
       <Link to="/rules/lunchbox" className="italicBlue" > Suggested Rules (feel free to modify. We are here to have FUN!)</Link>
      </Grid>
    </Box>
  );
};

export default GameOptions;
