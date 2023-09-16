import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminDashboard() {
  return (
    <div>
      <AdminHeader />
      <Grid container>
        <Grid item xs={12} md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Container>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  {/* Nội dung phần trái */}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  {/* Nội dung phần phải */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;
