// ResearchTopics.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DEFAULT_BACKEND_URL from "../config.js";

const NO_RESEARCH_IMAGE = require("../assets/img/research.webp");

function ResearchTopics() {
  const mockResearchTopics = [
    {
      id: 1,
      name: "Sample Research 1",
      category: { name: "Sample Category 1" },
      description: "This is a sample research description.",
      study_hours: 10,
      approval_status: "Pending",
      study_status: "InProgress",
    },
    {
      id: 2,
      name: "Sample Research 2",
      category: { name: "Sample Category 2" },
      description: "Another sample research description.",
      study_hours: 15,
      approval_status: "Approved",
      study_status: "Completed",
    },
    // Add more sample research topics as needed
  ];
  const [researchTopics, setResearchTopics] = useState(mockResearchTopics);
  const [isEmpty, setIsEmpty] = useState(mockResearchTopics.length === 0);

  useEffect(() => {
    async function fetchResearchTopics() {
      try {
        const response = await axios.get(
          `${DEFAULT_BACKEND_URL}/api/research-topics/`
        );
        setResearchTopics(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error("Error fetching research topics:", error);
      }
    }
    fetchResearchTopics();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <div className="research-topics-list-container">
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h4" style={{ margin: "20px 0" }}>
                Danh sách đề tài nghiên cứu
              </Typography>
            </Grid>
          </Grid>
          {!isEmpty ? (
            <List>
              {researchTopics.map((topic, index) => (
                <React.Fragment key={topic.id}>
                  <ListItem>
                    <Card sx={{ width: "100%" }}>
                      <CardHeader title={topic.name} />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Danh mục: {topic.category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mô tả: {topic.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Số giờ nghiên cứu: {topic.study_hours}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Trạng thái kiểm phê duyệt: {topic.approval_status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Trạng thái nghiên cứu: {topic.study_status}
                        </Typography>
                        {/* ... Other fields ... */}
                      </CardContent>
                      {/* ... CardMedia ... */}
                    </Card>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <Grid item xs={12} textAlign="center">
                <img
                  src={NO_RESEARCH_IMAGE}
                  alt="No Research"
                  style={{ width: "300px", height: "300px" }}
                />
                <Typography variant="h6">
                  Hiện chưa có đề tài nghiên cứu.
                </Typography>
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ResearchTopics;
