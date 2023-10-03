import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50, // High z-index so that it overlays everything else
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
