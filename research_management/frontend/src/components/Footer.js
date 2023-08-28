import React from "react";
import { Typography, Link } from "@mui/material";

function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "20px",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography variant="body2" style={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} Research App. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="/privacy-policy" style={{ marginRight: "10px" }}>
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="/terms-of-use" style={{ marginLeft: "10px" }}>
          Terms of Use
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
