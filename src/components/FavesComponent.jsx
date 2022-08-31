import React from "react";
import { pink, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { getDateHoursBetweenCurrentDate } from "../utils/dates.js"
export const FavesComponent = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  const favoritesInLocalStorage =
    JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesIdsInLocalStorage =
    favoritesInLocalStorage.map((item) => item.objectID) || [];

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);

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
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {favorites.map((card) => (
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
                {`${getDateHoursBetweenCurrentDate(card.created_at)} hours ago`} by autor {card.author} by {card.author}
                </Typography>
                <Typography>{card.story_title}</Typography>
              </CardContent>
             
              <div className="Rectangle-grey">
              <CardActions>
                <Button>
                  <FavoriteIcon
                    onClick={() => toggleFavorites(card)}
                    sx={{ py:5,
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
      <Stack sx={{ py: 4 }} direction="row" spacing={2} justifyContent="center">
        <Pagination count={10} shape="rounded" color="primary" />
      </Stack>
    </Container>
  );
};
