import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Circles from "./FloatingCircles"

const useStyles = makeStyles((theme) => ({
    rulesOuter: {
        position: 'relative'
    },
    center: {
        textAlign: 'center'
    }
    
  }));

const RulesLunchBox = () => {
  const classes = useStyles();

  return(
      
    <Box className={classes.rulesOuter}  mr={6} ml={6}>  
      <Circles />
      <Box className={classes.center} mr={6} ml={6}>
        <h1> <span className="accentYellow">LunchBox</span> Rules </h1>
      </Box>
      <Grid container spacing={6} mr={6} ml={6}>
        <Grid item xs={6} md={6} p={5}>
          <Box pl={4}>
            <h2>Lunchbox Overview</h2>
            <p> Lunchbox (also known as Celebrity) is a party where two teams play against each other to guess as many names as possible before time runs out. The game takes place in three rounds of increasing difficulty.
It might sound simple but it’s lots of fun! </p>
            <h2>Players</h2>
            <p> 4 to 8 players, divided into two teams.</p>
            <h2> Goal </h2>
            <p>The goal is for your team to guess more of the names than any other team over three rounds. </p>
            <h2> Setup </h2>
            <p> Before play begins, each player adds several names to the lunchbox (usually five - ten depending on party size). The names must be kept secret. 
Legal names can be anything from pop culture figures or sports stars to names of books, movies or tv shows. There are very few limits to what names you can enter into the lunchbox and there’s no need to be too clever. Lunchbox is best when the names aren’t too obscure. We recommend only writing names where you think it’s most likely that at least half of the players will have heard of what you wrote down.
After all the names are entered into the lunchbox, the players are split into two teams.
It is then randomly determined which team will go first, and which player from that team will be the first clue giver. When the clue-giver is ready to begin, they can click the start button. They will then have 60 seconds to get their team to guess as many names from the lunchbox as possible. </p>
          </Box>
           
        </Grid>
        <Grid item xs={6} md={6} p={4}>
        <Box pr={4}> 
        <h2>Gameplay: <span className="accentTestGreen">Round One</span></h2>
            <p> In the first round, the clue-giver has few restrictions. The person can say anything, as long as it's not part of the name on the card.
Whenever a name is guessed correctly, the clue-giver clicks the green check! button, continuing until time expires or there are no names left in the lunchbox. If an illegal clue is given, click the red x. The name will be set aside and a new name will be drawn from the lunchbox.
When time expires, the team is given one point per correct guess. If any names have been set aside due to an illegal clue being given, they will be returned to the lunchbox before the next round.
Then play trunks to the other team and the clock resets. The new clue-giver can click the start button and the new turn begins.
Play continues until all names in the lunchbox have been guessed and the round ends.</p>
            <h2>Gameplay: <span className="accentTestGreen">Round Two</span></h2>
            <p> After the first round ends, the scores are noted and all of the names are returned to the hat.
Starting with the team whose turn was interrupted at the end of the first round, the second round proceeds in the same way as the first with one major exception: The clue-giver is limited to only one word (which can be repeated). Gestures are also permitted, as are sound effects.</p>
            <h2>Gameplay: <span className="accentTestGreen">Round Three</span></h2>
            <p>Starting with the team whose turn was interrupted at the end of the second round, the third round proceeds in the same way as the second with an additional exception: The clue-giver now cannot speak at all. Only gestures and sound effects are permitted.
</p>
        </Box>     
        </Grid>
      </Grid>
      <Box className={classes.center} mr={6} ml={6}>
        <h2><span className="accentTestGreen">Winning </span></h2>
<p> After all the names have been guessed in the third round, the scores from all three rounds are added together. The team with the most points wins.
</p>
      </Box>
    </Box>
    
    
      
  )
}

export default RulesLunchBox;