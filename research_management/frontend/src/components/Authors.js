// Tạo một component mới, ví dụ Authors.js
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function Authors({ authors }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Danh sách Tác giả
      </Typography>
      <List>
        {authors.map((author) => (
          <ListItem key={author.id} alignItems="flex-start">
            <ListItemText primary={author.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Authors;
