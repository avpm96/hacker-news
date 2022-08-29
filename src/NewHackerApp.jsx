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
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { pink, grey } from "@mui/material/colors";
export const NewHackerApp = () => {
  //localstorage

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const openUrl = (url) => {
    window.open(url, "_blank", "noopener");
  };
  const toggleFavorites = (id) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(id)) {
      newFavorites = favorites.filter((element) => element.objectID !== id);
    } else {
      newFavorites.push(id);
    }
    setFavorites(newFavorites);
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${event.target.value}=0`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setData(response.hits);
        console.log(response);
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
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <h2>HACKER NEWS</h2>
        <Container maxWidth="sm">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <ButtonGroup
              sx={{ py: 2 }}
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button>All</Button>
              <Button>My faves</Button>
            </ButtonGroup>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}

        <Stack
          sx={{ py: 4 }}
          direction="row"
          spacing={2}
          justifyContent="start"
        >
          <FormControl  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              select your news
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
        </Stack>
        <Grid container spacing={4}>
          {data.map((card) => (
            <Grid item key={card.objectID} xs={12} sm={6} md={6}>
              <Card
                className="Rectangle"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  onClick={() => openUrl(card.story_url)}
                  sx={{ flexGrow: 1 }}
                >
                  <Typography>
                    {card.created_at} {card.author}
                  </Typography>
                  <Typography>{card.story_title}</Typography>
                </CardContent>
                <CardActions>
                  <Button>
                    <FavoriteIcon
                      onClick={() => toggleFavorites(card.objectID)}
                      sx={{
                        color: [
                          favorites.includes(card.objectID)
                            ? pink[500]
                            : grey[500],
                        ],
                      }}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};
