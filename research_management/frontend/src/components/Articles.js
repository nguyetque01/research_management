import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

function Article({ articles }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Danh sách Bài viết
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} md={6} key={article.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày xuất bản: {article.publishDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Article;
