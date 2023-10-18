import React, { useState, useEffect } from "react";
import { IoBagHandle, IoCreate, IoPeople, IoRibbonSharp } from 'react-icons/io5';
import {Grid } from "@mui/material";
import fetchData from '../../utils/apiUtils';
import DEFAULT_BACKEND_URL from '../../config';
import addDataToRegister, {
    getRegisteredTopicsByUserId,
  } from "../../utils/registerUtils";
import { useSelector } from "react-redux";

function DashboardGrid() {
    const backendUrl = DEFAULT_BACKEND_URL;
    const [awards, setAwards] = useState([]);
    const [researchTopics, setResearchTopics] = useState([]);
    const [users, setUsers] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [researchTopicRegistrations, setResearchTopicRegistrations] = useState([]);
    const [researchActivityDetails, setResearchActivityDetails] = useState([]);
    const [researchTypes, setResearchTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [registeredListByUser, setRegisteredListByUser] = useState([]);
    const [units, setUnits] = useState([]);
    const [leadUnits, setLeadUnits] = useState([]);
    const [levels, setLevels] = useState([]);
    const userData = useSelector((state) => state.user.userData);
    const [categories, setCategories] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);


    // Gửi HTTP request để lấy danh sách user từ backend
    const fetchUsers = () =>
    fetchData(`${backendUrl}/api/users/`, setUsers);

    // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
    useEffect(() => {
    fetchUsers();
    }, []);
    

    // Gửi HTTP request để lấy danh sách giải thưởng NCKH từ backend
    const fetchAwards = () =>
    fetchData(`${backendUrl}/api/research-awards/`, setAwards);

    // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
    useEffect(() => {
    fetchAwards();
    }, []);

    // Gửi HTTP request để lấy danh sách data từ backend
    async function fetchDataList() {
        try {
        await fetchData(
            `${backendUrl}/api/research-activities/`,
            setDataList
        );
        } catch (error) {
        console.log(error);
        }
    }

    async function fetchResearchTopics() {
        try {
          await fetchData(
            `${backendUrl}/api/research-topics/`,
            setResearchTopics,
          );
        } catch (error) {
          console.log(error);
        }
      }

    async function fetchResearchTopicRegistrations() {
        try {
        await fetchData(
            `${backendUrl}/api/research-topic-registrations/`,
            setResearchTopicRegistrations,
        );
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        const fetchAllData = async () => {
        setIsLoading(true);
        try {
            // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
            await Promise.all([
            fetchDataList(),
            fetchData(`${backendUrl}/api/academic-years/`, setAcademicYears),
            fetchData(`${backendUrl}/api/units/`, setUnits),
            fetchData(`${backendUrl}/api/lead-units/`, setLeadUnits),
            fetchData(`${backendUrl}/api/levels/`, setLevels),
            fetchData(`${backendUrl}/api/research-types/`, setResearchTypes),
            fetchData(`${backendUrl}/api/users/`, setUsers),
            fetchData(
                `${backendUrl}/api/research-activity-categories/`,
                setCategories
            ),
            fetchData(
                `${backendUrl}/api/research-activity-details/`,
                setResearchActivityDetails
            ),
            fetchDataList(),
            fetchResearchTopics(),
            fetchResearchTopicRegistrations(),
            ]);
        } catch (error) {
            console.log(error);
        }
        const registered = getRegisteredTopicsByUserId(
            userData?.id,
            researchTopicRegistrations,
            researchTopics
        );
        setRegisteredListByUser(registered);
        console.log(userData);
        console.log(registeredListByUser);
        setIsLoading(false);
        };
        fetchAllData();
    }, []);

	return (
        <Grid container spacing={2}>
            <Grid item xs
                style={{
                    border: "1px solid #5BA8A0", 
                    borderRadius: "5px", 
                    backgroundColor: '#5BA8A0', 
                    padding: "16px", 
                    margin: "10px 10px", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                }}>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoBagHandle style={{color: "white"}} />
                </div>
                    <div className="pl-4" >
                        <span style={{color: "white"}}>Tổng Đề Tài</span>
                    <div className="flex items-center">
                        <strong style={{color: "white"}}>{researchTopics.length}</strong>
                    </div>
                </div>
            </Grid>
            <Grid item xs
                style={{
                    border: "1px solid #FE676E", 
                    borderRadius: "5px", 
                    backgroundColor: '#FE676E', 
                    padding: "16px", 
                    margin: "10px 10px", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                }}>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoCreate style={{color: "white"}} />
				</div>
				<div className="pl-4">
					<span style={{color: "white"}}>Tổng Số Hoạt Động</span>
					<div className="flex items-center">
						<strong style={{color: "white"}} >{dataList.length}</strong>
					</div>
				</div>
            </Grid>
            <Grid item xs
                style={{
                    border: "1px solid #2D82B5", 
                    borderRadius: "5px", 
                    backgroundColor: '#2D82B5', 
                    padding: "16px", 
                    margin: "10px 10px", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                }}>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoPeople style={{color: "white"}} />
				</div>
				<div className="pl-4">
					<span style={{color: "white"}}>Tổng Số Người Sử Dụng</span>
					<div className="flex items-center">
						<strong style={{color: "white"}} >{users.length}</strong>
					</div>
				</div>
            </Grid>
            <Grid item xs
                style={{
                    border: "1px solid #C2649A", 
                    borderRadius: "5px", 
                    backgroundColor: '#C2649A', 
                    padding: "16px", 
                    margin: "10px 10px", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
                }}>
				<div >
					<IoRibbonSharp style={{color: "white"}} />
				</div>
				<div className="pl-4">
					<span style={{color: "white"}}>Tổng Giải Thưởng</span>
					<div className="flex items-center">
						<strong style={{color: "white"}}>{awards.length}</strong>
					</div>
				</div>
            </Grid>
        </Grid>
	)
}

export default DashboardGrid;