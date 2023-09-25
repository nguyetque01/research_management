import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginStatus, setUserData } from "./actions/userActions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Pages
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AITool from "./pages/AITool";
import Registration from "./pages/Registration";
import ResearchsRegistration from "./pages/ResearchsRegistration";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AcademicProfiles from "./pages/admin/AcademicProfiles";
import ResearchActivities from "./pages/admin/ResearchActivities";
import ResearchTopics from "./pages/admin/ResearchTopics";
import AcademicYears from "./pages/admin/general/AcademicYears";
import Units from "./pages/admin/general/Units";
import LeadUnits from "./pages/admin/general/LeadUnits";
import Levels from "./pages/admin/general/Levels";
import ResearchTypes from "./pages/admin/general/ResearchTypes";

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
          <Route path="/about" Component={About} />
          <Route path="/login" Component={Login} />
          <Route path="/profile" Component={Profile} />
          <Route path="/profile/edit" Component={EditProfile} />
          <Route path="/ai-tool" Component={AITool} />
          <Route
            path="/research-activities/registration"
            Component={ResearchsRegistration}
          />
          <Route
            path="/researchs/registration"
            Component={ResearchsRegistration}
          />

          {/* Admin */}
          <Route path="/admin/" Component={AdminDashboard} />
          <Route path="/admin/dashboard" Component={AdminDashboard} />
          <Route path="/admin/users" Component={Users} />
          <Route path="/admin/academic-profiles" Component={AcademicProfiles} />
          <Route
            path="/admin/research-activities"
            Component={ResearchActivities}
          />
          <Route path="/admin/research-topics" Component={ResearchTopics} />
          <Route path="/admin/academic-years" Component={AcademicYears} />
          <Route path="/admin/units" Component={Units} />
          <Route path="/admin/lead-units" Component={LeadUnits} />
          <Route path="/admin/levels" Component={Levels} />
          <Route path="/admin/research-types" Component={ResearchTypes} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
