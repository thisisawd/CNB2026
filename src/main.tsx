
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { IconSetProvider } from "./components/IconSetContext";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(
    <IconSetProvider>
      <App />
    </IconSetProvider>
  );
  