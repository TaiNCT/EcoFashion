import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function Navigation() {
  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
            background: "linear-gradient(to right, #d4e9b4, #f9f4a8)",
            boxShadow: 3,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f8e2",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HomeIcon
                sx={{
                  fontSize: 30,
                  color: "#3e4b3b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": { color: "#2e7d32", transform: "scale(1.1)" },
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  ml: 1,
                  fontFamily: "Georgia, serif",
                  color: "#3e4b3b",
                  transition: "color 0.3s",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                EcoFashion
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InfoIcon
                sx={{
                  fontSize: 24,
                  color: "#4b4b4b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#ff8a65",
                    transform: "rotate(15deg) scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="button"
                sx={{
                  color: "#4b4b4b",
                  ml: 0.5,
                  "&:hover": { color: "#ff8a65" },
                }}
              >
                Our Story
              </Typography>
            </Link>
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DashboardIcon
                sx={{
                  fontSize: 24,
                  color: "#4b4b4b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#42a5f5",
                    transform: "rotate(-15deg) scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="button"
                sx={{
                  color: "#4b4b4b",
                  ml: 0.5,
                  "&:hover": { color: "#42a5f5" },
                }}
              >
                Dashboard
              </Typography>
            </Link>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ContactMailIcon
                sx={{
                  fontSize: 24,
                  color: "#4b4b4b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#ffca28",
                    transform: "rotate(15deg) scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="button"
                sx={{
                  color: "#4b4b4b",
                  ml: 0.5,
                  "&:hover": { color: "#ffca28" },
                }}
              >
                Contact
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
