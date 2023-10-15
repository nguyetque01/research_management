import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  margin: "auto",
  marginTop: "40px",
};

const headerStyle = {
  backgroundColor: "#3f51b5",
  color: "white",
  padding: "10px",
  borderRadius: "10px 10px 0 0",
  textAlign: "center",
  marginBottom: "24px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
};

const formInputStyle = {
  marginBottom: "10px",
};

const imageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
};

const closeButtonStyle = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  minWidth: "unset",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
};

const iconButtonStyle = {
  paddingTop: "6px",
  paddingBottom: "6px",
  paddingLeft: "6px",
  paddingRight: "6px",
  minHeight: 0,
  minWidth: 0,
};

export {
  VisuallyHiddenInput,
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  imageContainerStyle,
  closeButtonStyle,
  iconButtonStyle,
};
