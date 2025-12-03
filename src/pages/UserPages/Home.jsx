import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const placeOrder = () => {
    navigate("/category"); // navigate to your order page
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 max-w-7xl px-6 py-12 md:py-24 items-center justify-between md:space-x-10 space-y-10 md:space-y-0">
        {/* Left Section - Logo + Branding */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-6 md:space-y-0 text-center md:text-left">
          {/* Logo */}
          <img
            src="/logos.png"
            alt="App Logo"
            className="h-32 w-32 md:h-50 md:w-50"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(15%) sepia(96%) saturate(7482%) hue-rotate(357deg) brightness(70%) contrast(111%)",
            }}
          />

          {/* Text Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#5fb298]">
              Order Food
            </h1>
            <p className="text-lg text-gray-700 max-w-sm">
              Your trusted food partner bringing you{" "}
              <span className="font-semibold text-[#a42323]">
                tasty, healthy, and fresh meals{" "}
              </span>
              every single day.
            </p>
          </div>
        </div>

        {/* Right Section - Hero Text + Button */}
        <div className="flex flex-col items-center md:items-start space-y-5 max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#b01010] leading-tight">
            🍔 Fast, Fresh & <br />
            <span className="text-[#5fb298]">Served at Your Table</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Enjoy delicious dishes directly from the restaurant, ordered from
            your table and served fresh to you.{" "}
            <span className="text-[#b91c1c] font-bold">
              {" "}
              Experience dining like never before!
            </span>
          </p>

          <Button
            onClick={placeOrder}
            variant="contained"
            sx={{
              backgroundColor: "#5fb298",
              "&:hover": { backgroundColor: "#499984" },
              paddingX: 4,
              paddingY: 1.2,
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "14px",
              textTransform: "none",
              boxShadow: "0px 6px 14px rgba(0,0,0,0.2)",
            }}
          >
            Place Your Order
          </Button>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 320" className="w-full">
        <path
          fill="#b5e9d5"
          fillOpacity="1"
          d="M0,64L60,90.7C120,117,240,171,360,160C480,149,600,75,720,85.3C840,96,960,192,1080,224C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5fb298" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
