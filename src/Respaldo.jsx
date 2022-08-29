import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const NewHackerApp = () => {
  //localstorage
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const handleChange = (event) => {
    setSearch(event.target.value);
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${event.target.value}=0`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setData(response);
      });
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} justifyContent="end">
        <h2>HACKER NEWS</h2>
      </Grid>
      <Grid item xs={6}>
        <ButtonGroup
          sx={{ py: 2 }}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button>All</Button>
          <Button>My faves</Button>
        </ButtonGroup>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select your news
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={search}
            label="Select your news"
            onChange={handleChange}
          >
            <MenuItem value="angular">Angular</MenuItem>
            <MenuItem value="reactjs">React.js</MenuItem>
            <MenuItem value="vuejs">Vue.js</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid itemxs={12}></Grid>

      {Array.from(Array(4)).map((_, index) => (
        <Grid item xs={2} sm={6} md={6} key={index}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>

              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
