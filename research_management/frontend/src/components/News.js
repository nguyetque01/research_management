import React, { useState } from 'react';
import { Tab, Tabs, Divider, Grid } from "@mui/material";

function News() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const notifications = [
    {
      "date": "Tháng 10",
      "day": "03",
      "title": "Thông báo phân loại các hoạt động thành Giá trị HD ≤ 1 tỷ đồng, 1 tỷ đồng < Giá trị HĐ ≤ 2 tỷ đồng, 2 tỷ đồng < Giá trị HĐ",
      "description": "Các nhân viên theo dõi thông báo và đăng ký.",
      "link": "#"
    },
    {
      "date": "Tháng 09",
      "day": "25",
      "title": "(GẤP) Cập nhật thông tin làm thẻ Bảo hiểm y tế tân sinh viên khoá tuyển sinh năm 2023",
      "description": "",
      "link": "#"
    },
    {
      "date": "Tháng 09",
      "day": "22",
      "title": "Tổ chức “Sinh hoạt công dân - sinh viên” Đầu khoá đợt 1 năm học 2023 - 2024",
      "description": "",
      "link": "#"
    }
  ];

  const TabPanel = ({ value, index, children }) => {
    return value === index ? <div>{children}</div> : null;
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="action tabs example"
      >
        <Tab label="Thông Báo Chung" />
        <Tab label="Bài Báo NCKH Đã Phát Hành" />
        <Tab label="Giải Thưởng NCKH" />
      </Tabs>
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <div key={index}>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                    <div className="notification-date">
                        <h2 style ={{border: "1px solid blue", 
                                    backgroundColor: "#3f51b5",
                                    color:"white",
                                    fontSize: "20px", 
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    }}>
                            {notification.date}
                        </h2>
                        <p style ={{
                                    color:"#3f51b5",
                                    fontSize: "30px", 
                                    textAlign: "center",
                                    marginTop: "10px",
                                    }}>
                            {notification.day}
                        </p>
                    </div>
                    </Grid>
                    <Grid item xs={10} >
                        <div className="notification-header" >
                            <h3 style ={{color:"#3f51b5", marginBottom: "5px"}}>{notification.title}</h3>
                        </div>
                        <p className="notification-description" style ={{ marginBottom: "5px"}}>{notification.description}</p>
                        <a className="notification-link" href={notification.link} 
                            style ={{color:"red", textDecoration: "none"}}
                        >
                            Xem chi tiết
                        </a>
                    </Grid>
                </Grid>
            </TabPanel>
            {index !== notifications.length - 1 && <Divider style={{margin: "5px 0"}}/>}
          </div>
        ))}
        <TabPanel value={value} index={1}>
            <h2>Tab 2 Content</h2>
            <p>This is the content for Tab 2.</p>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <h2>Tab 2 Content</h2>
            <p>This is the content for Tab 2.</p>
        </TabPanel>
      </div>
    </div>
      
  );
}

export default News;
