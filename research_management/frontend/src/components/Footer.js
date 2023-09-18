import React from "react";
import { Typography, Link } from "@mui/material";

function Footer({ style, textStyle, linkStyle }) {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "20px",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        ...style,
      }}
    >
      <Typography
        variant="body2"
        style={{ marginBottom: "10px", ...textStyle }}
      >
        © {new Date().getFullYear()} DNTU FIT Research Management System. All
        rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link
          href="/privacy-policy"
          style={{ marginRight: "10px", ...linkStyle }}
        >
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" style={{ marginLeft: "10px", ...linkStyle }}>
          Terms of Use
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
