import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Beverages",
    image: "/beverages.jpg",
  },
  {
    name: "Appetizers",
    image: "/appetizers.jpg",
  },
  {
    name: "Desserts",
    image: "/desserts.jpg",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 p-6">
      <Typography
        variant="h4"
        className="pb-8 text-center font-extrabold text-[#b01010]"
      >
        Explore Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.name}
            sx={{
              width: 300,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
              },
              cursor: "pointer",
            }}
          >
            {category.image && (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            )}

            <CardContent sx={{ backgroundColor: "#f0fdf4" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                align="center"
                color="#1e293b"
              >
                {category.name}
              </Typography>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#5fb298",
                    "&:hover": { backgroundColor: "#499984" },
                    textTransform: "none",
                    borderRadius: "12px",
                    px: 4,
                  }}
                  onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                >
                  Click for order
                </Button>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}
