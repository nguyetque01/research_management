import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResearchTopics from "./pages/ResearchTopics";
import UserList from "./pages/UserList";
import Article from "./pages/Article";
import AITool from "./pages/AITool";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/research-topics" Component={ResearchTopics} />
          <Route path="/users" Component={UserList} />
          <Route path="/articles/:articleId" component={Article} />
          <Route path="/ai-tool" Component={AITool} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
