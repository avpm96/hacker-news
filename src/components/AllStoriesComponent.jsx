import React from "react";
import { pink, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
export const AllStoriesComponent = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [favoritesIds, setFavoritesIds] = React.useState([]);

  const openUrl = (url) => {
    window.open(url, "_blank", "noopener");
  };

  const toggleFavorites = (story) => {
    let newFavorites = [...favorites];
    if (favoritesIds.includes(story.objectID)) {
      newFavorites = favorites.filter(
        (element) => element.objectID !== story.objectID
      );
    } else {
      newFavorites.push(story);
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    const newFavoritesIds = newFavorites.map((item) => item.objectID);
    setFavoritesIds(newFavoritesIds);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    localStorage.setItem("selected", event.target.value);
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

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Stack sx={{ py: 4 }} direction="row" spacing={2} justifyContent="start">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                flexDirection: "row",
              }}
            >
              <CardContent
                onClick={() => openUrl(card.story_url)}
                sx={{ flexGrow: 1 }}
              >
                <Typography icon={<FavoriteIcon />}>
                  {card.created_at} by {card.author}
                </Typography>
                <Typography>{card.story_title}</Typography>
              </CardContent>
              <CardActions>
                <Button>
                  <FavoriteIcon
                    onClick={() => toggleFavorites(card)}
                    sx={{
                      color: [
                        favoritesIds.includes(card.objectID)
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
      <Stack sx={{ py: 4 }} direction="row" spacing={2} justifyContent="center">
        <Pagination count={10}  shape="rounded" color="primary" />
      </Stack>
    </Container>
  );
};
