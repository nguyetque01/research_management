import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function ResearchTopics({ topics }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Danh sách đề tài nghiên cứu
      </Typography>
      <List>
        {topics.map((topic) => (
          <ListItem key={topic.id} alignItems="flex-start">
            <ListItemText primary={topic.title} secondary={topic.summary} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ResearchTopics;
