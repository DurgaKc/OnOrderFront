import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
