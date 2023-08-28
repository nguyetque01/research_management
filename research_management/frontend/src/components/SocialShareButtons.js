import React from "react";
import { Button, Grid, Typography } from "@mui/material";

function SocialShareButtons() {
  const handleShare = (platform) => {
    // Thực hiện hành động chia sẻ tương ứng với platform
    console.log(`Shared on ${platform}`);
  };

  return (
    <div>
      <Typography variant="h6">Chia sẻ:</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShare("Facebook")}
          >
            Facebook
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleShare("Twitter")}
          >
            Twitter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleShare("LinkedIn")}
          >
            LinkedIn
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SocialShareButtons;
