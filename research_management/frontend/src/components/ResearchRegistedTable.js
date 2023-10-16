import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  getAcademicProfileByUserID,
  getActivityByID,
  getAuthorsName,
  getCategoryByID,
  getPositionByID,
  getRegistrationsByUserID,
  getResearchHours,
  getStatusByID,
  getSubmissionByTopicID,
  getTopicByID,
  getUserByID,
} from "../utils/commonUtils";
import positions from "../data/positions";
import approvalStatus from "../data/approvalStatus";
import completionStatus from "../data/completionStatus";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { iconButtonStyle } from "../assets/style/style";

function ResearchRegistedTable({
  data,
  users,
  academicProfiles,
  researchActivities,
  researchCategories,
  researchActivityDetails,
  researchTopicRegistrations,
  researchTopicSubmissions,
  handleEditItem,
  handleEditResearchTopic,
  handleEditRegistration,
  handleEditSubmission,
  openDeleteDialog,
  index,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} style={{ minWidth: 50 }}>
              STT
            </TableCell>
            <TableCell
              colSpan={3}
              style={{ textAlign: "center", minWidth: 600 }}
            >
              Hoạt động nghiên cứu KH & CN
            </TableCell>
            <TableCell
              colSpan={5}
              style={{ textAlign: "center", minWidth: 500 }}
            >
              Chi tiết thông tin đăng ký
            </TableCell>
            <TableCell style={{ minWidth: 70 }}>
              Trạng thái phê duyệt đăng ký
            </TableCell>
            <TableCell style={{ minWidth: 70 }}>
              Trạng thái hoàn thành
            </TableCell>
            <TableCell rowSpan={2} style={{ minWidth: 70 }}>
              Thông tin đề tài
            </TableCell>
            <TableCell rowSpan={2} style={{ minWidth: 70 }}>
              Thông tin đăng ký
            </TableCell>
            <TableCell rowSpan={2} style={{ minWidth: 70 }}>
              Thông tin nộp đề tài
            </TableCell>
            <TableCell rowSpan={2} style={{ minWidth: 70 }}>
              Xóa đề tài
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ minWidth: 400 }}>Hoạt động</TableCell>
            <TableCell style={{ minWidth: 150 }}>Phân loại</TableCell>
            <TableCell style={{ minWidth: 70 }}>Số giờ</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên tác giả</TableCell>
            <TableCell style={{ minWidth: 70 }}>Vị trí tác giả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên đề tài</TableCell>
            <TableCell style={{ minWidth: 70 }}>Số giờ dự kiến</TableCell>
            <TableCell style={{ minWidth: 70 }}>Kinh phí dự kiến</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => {
            const userRegistrations = getRegistrationsByUserID(
              researchTopicRegistrations,
              user?.id
            );

            return userRegistrations.map((registration, registrationIndex) => {
              const topic = getTopicByID(data, registration?.topic);
              const activity = topic
                ? getActivityByID(researchActivities, topic.activity)
                : "";
              const category = topic
                ? getCategoryByID(researchCategories, topic.category)
                : "";
              const authorsName = topic
                ? getAuthorsName(topic.authors, users)
                : "";
              const registrant = getUserByID(users, registration?.registrant);
              const registrantProfile = getAcademicProfileByUserID(
                academicProfiles,
                registration?.registrant
              );
              const registrantPosition = registrantProfile
                ? getPositionByID(positions, registrantProfile.position)
                : "";
              const submission = getSubmissionByTopicID(
                researchTopicSubmissions,
                topic?.id
              );
              return (
                topic && (
                  <TableRow key={topic?.id}>
                    <TableCell>{registrationIndex + 1}</TableCell>
                    <TableCell>{activity?.name}</TableCell>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell>
                      {getResearchHours(
                        activity?.id,
                        category?.id,
                        researchActivities,
                        researchActivityDetails
                      )}
                    </TableCell>
                    <TableCell>
                      {authorsName.length !== 0
                        ? authorsName.map((name, index) =>
                            index > 0 ? `, ${name}` : name
                          )
                        : ""}
                    </TableCell>
                    <TableCell>{registration?.author_position}</TableCell>
                    <TableCell>{topic?.name}</TableCell>
                    <TableCell>{registration?.expected_hours}</TableCell>
                    <TableCell>{registration?.expected_budget}</TableCell>
                    <TableCell>
                      {getStatusByID(
                        approvalStatus,
                        registration?.approval_status
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusByID(
                        completionStatus,
                        topic?.completion_status
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="text"
                        sx={iconButtonStyle}
                        color="primary"
                        size="small"
                        onClick={() => handleEditResearchTopic(topic?.id)}
                        startIcon={
                          <BorderColorIcon
                            sx={{ padding: 0, marginLeft: "10px" }}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        sx={iconButtonStyle}
                        color="primary"
                        size="small"
                        onClick={() => handleEditRegistration(topic?.id)}
                        startIcon={
                          <BorderColorIcon
                            sx={{ padding: 0, marginLeft: "10px" }}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        sx={iconButtonStyle}
                        color="primary"
                        size="small"
                        onClick={() => handleEditSubmission(topic?.id)}
                        startIcon={
                          <BorderColorIcon
                            sx={{ padding: 0, marginLeft: "10px" }}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {/* <Button
                          variant="outlined"
                          sx={iconButtonStyle}
                          color="primary"
                          size="small"
                          style={{ marginRight: "8px" }}
  
                          startIcon={
                            <EditIcon sx={{ padding: 0, marginLeft: "10px" }} />
                          }
                          onClick={() => handleEditItem(topic?.id)}
                        /> */}
                        <Button
                          variant="outlined"
                          sx={iconButtonStyle}
                          color="error"
                          size="small"
                          startIcon={
                            <DeleteIcon
                              sx={{ padding: 0, marginLeft: "10px" }}
                            />
                          }
                          onClick={() => openDeleteDialog(topic)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResearchRegistedTable;
