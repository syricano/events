import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import "./index.css"
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
    
  </BrowserRouter>
);