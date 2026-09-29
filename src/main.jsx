import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
