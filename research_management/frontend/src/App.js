import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginStatus, setUserData } from "./actions/userActions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResearchTopics from "./pages/ResearchTopics";
import UserList from "./pages/UserList";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AITool from "./pages/AITool";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage không
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken && storedUserData) {
      // Nếu có thông tin đăng nhập, bạn có thể dispatch action để cập nhật Redux Store
      dispatch(setUserLoginStatus(true)); // Đánh dấu người dùng đã đăng nhập
      dispatch(setUserData(JSON.parse(storedUserData))); // Cập nhật thông tin người dùng từ localStorage
    } else {
      // Nếu không có thông tin đăng nhập trong localStorage, đảm bảo rằng Redux Store cũng đã được đặt lại để đánh dấu người dùng đã đăng xuất
      dispatch(setUserLoginStatus(false)); // Đánh dấu người dùng đã đăng xuất
    }
  }, [dispatch]);

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
          <Route path="/profile" Component={Profile} />
          <Route path="/edit-profile" Component={EditProfile} />
          <Route path="/ai-tool" Component={AITool} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
