import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Route.jsx";
import ContextProvide from "./Context/ContextProvide.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvide>
      <RouterProvider router={routers} />
    </ContextProvide>
  </StrictMode>
);
