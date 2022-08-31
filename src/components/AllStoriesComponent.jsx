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
import { getDateHoursBetweenCurrentDate } from "../utils/dates.js"
export const AllStoriesComponent = () => {
  const favoritesInLocalStorage =
    JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesIdsInLocalStorage =
    favoritesInLocalStorage.map((item) => item.objectID) || [];

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [favorites, setFavorites] = React.useState(favoritesInLocalStorage);
  const [favoritesIds, setFavoritesIds] = React.useState(
    favoritesIdsInLocalStorage
  );

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
    <Container sx={{ py: 8 }} maxWidth="md" >
      <Stack sx={{ py: 4 }} direction="row" spacing={2} justifyContent="start" >
        <FormControl sx={{ m: 1, minWidth: 200 }} >
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
            <MenuItem value="angular">
              <div>
                <img  className="image" src="/src/assets/icons/angular.jpg" />
                <span className="select">Angular</span>
              </div>
            </MenuItem>
            <MenuItem value="reactjs"><div>
                <img  className="image" src="/src/assets/icons/react.jpg" />
                <span className="select">React.js</span>
              </div></MenuItem>
            <MenuItem value="vuejs"><div>
                <img  className="image" src="/src/assets/icons/vue.jpg" />
                <span className="select">Vue.js</span>
              </div></MenuItem>
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
                   {`${getDateHoursBetweenCurrentDate(card.created_at)} hours ago`} by autor {card.author}
                </Typography>
                <Typography className="word">{card.story_title}</Typography>
              </CardContent>
              <div className="Rectangle-grey">
                <CardActions>
                  <Button>
                    <FavoriteIcon
                      onClick={() => toggleFavorites(card)}
                      sx={{
                        py: 5,
                        color: [
                          favoritesIds.includes(card.objectID)
                            ? pink[500]
                            : grey[500],
                        ],
                      }}
                    />
                  </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      {search.length > 0 && (
        <Stack
          sx={{ py: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Pagination count={10} shape="rounded" color="primary" />
        </Stack>
      )}
    </Container>
  );
};
