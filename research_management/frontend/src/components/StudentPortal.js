import React from 'react';
import { Divider } from "@mui/material";

const StudentPortal = () => {
    const containerStyle = {
        border: '1px solid #ccc', // Đặt border
        borderRadius: '10px', // Đặt border radius
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Đặt đổ bóng
        padding: '20px', // Đặt khoảng cách bên trong border
        backgroundColor: "blue",
    };

    const contentStyle = {
        color :"red",
        marginBottom: "10px",
        fontSize: "24px",
        paddingLeft: "10px",
        marginTop: "10px",
    };

    const content = {
        paddingLeft: "10px",
    };

    const acontent = {
        margin: "5px 0"
    };
    
    return (
        <div style={containerStyle}>
            <div style = {{border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        backgroundColor: "white",
                        }}>
                <h2 style={{textAlign: "center", color: "#3f51b5"}}>Cổng thông tin sinh viên DNTU</h2>
                <p style={contentStyle }>Sinh viên DNTU</p>
                <a href="https://sv.dntu.edu.vn" style={content}>https://sv.dntu.edu.vn</a>
                <Divider style={acontent}/>
                <p style={contentStyle }>Canvas Instructure</p>
                <a href="https://dntu.instructure.com" style={content}>https://dntu.instructure.com</a>
                <Divider style={acontent}/>
                <p style={contentStyle }>Elearning</p>
                <a href="https://elearning.dntu.edu.vn" style={content}>https://elearning.dntu.edu.vn</a>
                <Divider style={acontent} />
                <p style={contentStyle }>Facebook DNTU</p>
                <a href="https://www.facebook.com/dntuedu" style={content}>https://www.facebook.com/dntuedu</a>
            </div>
            
        </div>
  );
};

export default StudentPortal;