export default function getCategoriesByActivityId(categories, activityId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng categories
  for (const category of categories) {
    // Kiểm tra xem research_activity của phần tử hiện tại có trùng với activityId không
    if (category.research_activity === activityId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(category);
    }
  }
  return result;
}

export function getResearchCategoriesByActivityId(
  categories,
  activities,
  activityId
) {
  const activity =
    activities.length !== 0 && activityId
      ? getActivityByID(activities, activityId)
      : null;
  return activity
    ? getCategoriesByResearchTypeId(categories, activity.research_type)
    : null;
}

export function getCategoriesByResearchTypeId(categories, typeId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng categories
  for (const category of categories) {
    // Kiểm tra xem research_type của phần tử hiện tại có trùng với typeId không
    if (category.research_type === typeId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(category);
    }
  }
  return result;
}

export function getDetailsByActivityId(details, activityId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng details
  for (const detail of details) {
    // Kiểm tra xem research_type của phần tử hiện tại có trùng với activityId không
    if (detail.research_type === activityId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(detail);
    }
  }
  return result;
}

export function getActivityDetail(activityID, categoryID, details) {
  return details.find(
    (detail) => detail.activity === activityID && detail.category === categoryID
  );
}

export function getRegistrationsByUserID(researchTopicRegistrations, userID) {
  return researchTopicRegistrations.filter(
    (registration) => registration.registrant === userID
  );
}
export function getRegistrationByTopicID(
  researchTopicRegistrations,
  researchtopicID
) {
  return researchTopicRegistrations.length !== 0 && researchtopicID
    ? researchTopicRegistrations.find(
        (registration) => registration.topic === researchtopicID
      )
    : null;
}

export function getSubmissionByTopicID(
  researchTopicSubmissions,
  researchtopicID
) {
  return researchTopicSubmissions.length !== 0 && researchtopicID
    ? researchTopicSubmissions.find(
        (submission) => submission.topic === researchtopicID
      )
    : null;
}

export function getUserByID(users, userID) {
  return users?.length !== 0 && userID
    ? users.find((user) => user.id === userID)
    : null;
}
export function getAcademicProfileByUserID(profiles, userID) {
  return profiles.find((profile) => profile.user === userID);
}
export function getTypeByID(types, typeID) {
  return types?.length !== 0 && typeID
    ? types?.find((type) => type.id === typeID)
    : null;
}
export function getActivityByID(activities, activityID) {
  return activities?.length !== 0 && activityID
    ? activities.find((activity) => activity.id === activityID)
    : null;
}
export function getCategoryByID(categories, categoryID) {
  return categories.find((category) => category.id === categoryID);
}
export function getTopicByID(topics, topicID) {
  return topics?.length !== 0
    ? topics.find((topic) => topic.id === topicID)
    : null;
}

export function getPositionByID(positions, positionID) {
  return positions.find((position) => position.value === positionID)?.label;
}
export function getStatusByID(statuss, statusID) {
  return statuss.find((status) => status.value === statusID)?.label;
}

export function getResearchHours(
  activityID,
  categoryID,
  activities,
  activityDetails
) {
  const activity = activities?.find((activity) => activity.id === activityID);
  if (activity?.total_hours) {
    return activity?.total_hours;
  } else {
    const detail = getActivityDetail(activityID, categoryID, activityDetails);
    return detail?.total_hours;
  }
}
export function getAuthorsName(authorIDs, users) {
  const authorsName = authorIDs
    ? authorIDs.map((authorID) => getUserByID(users, authorID)?.full_name)
    : [];
  return authorsName;
}
