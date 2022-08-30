import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { AllStoriesComponent } from "./components/AllStoriesComponent";
import { grey } from "@mui/material/colors";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
export const NewHackerApp = () => {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="Rectangle-2-Copy">
        <Toolbar>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, color: grey[900], fontFamily: "Raleway" }}
          >
            HACKER NEWS
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ToggleButtonGroup
                className="Rectangle"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="web">All</ToggleButton>
                <ToggleButton value="android">Faves</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Container>
        </Box>

        <AllStoriesComponent />
      </main>
    </Box>
  );
};
