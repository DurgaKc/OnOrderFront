import { Typography } from "@mui/material";

export default function AdminHome() {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-r from-green-100 via-teal-100 to-blue-100">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 max-w-7xl px-6 py-16 md:py-20 items-center justify-center md:space-x-20 space-y-10 md:space-y-0">
        {/* Left Section - Branding Text */}
        <div className="  flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2563eb] flex items-center gap-2">
            📋Hello Admin 
          </h1>
          <Typography
            variant="h5"
            className="text-lg text-gray-700 max-w-lg leading-relaxed"
          >
            Manage all food orders{" "}
            <span className="font-semibold text-[#059669]">
              placed directly from restaurant tables 🍴
            </span>
            . Get real-time updates, monitor customer activity 👥, and streamline
            your service process ⚡.
          </Typography>
          <Typography
            variant="h5"
            className="text-lg text-gray-700 max-w-lg leading-relaxed"
          >
             Designed for{" "}
            <span className="font-semibold text-[#b91c1c]">
              efficiency and ease
            </span>
              — track orders 📝, handle tables 🪑, and keep everything running
            smoothly 🚀.
          </Typography>
        </div>

        {/* Right Section - Hero Text */}
        <div className="flex flex-col items-center md:items-start space-y-5 max-w-lg text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#059669] leading-tight">
            📊 Smart, Simple & <br />
            <span className="text-[#2563eb]">Built for Management</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Stay on top of{" "}
            <span className="font-semibold text-[#2563eb]">orders, tables</span>{" "}
            and{" "}
            <span className="font-semibold text-[#b91c1c]">restaurant insights</span>{" "}
            in one powerful dashboard 🛠️.
          </p>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1690 200"
        className="w-full"
      >
        <path
          fill="#d1fae5"
          fillOpacity="1"
          d="M0,64L60,90.7C120,117,240,171,360,160C480,149,600,75,720,85.3C840,96,960,192,1080,224C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
