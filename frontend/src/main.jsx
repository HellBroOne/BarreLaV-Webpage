import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ClasesProvider } from "./context/ClasesContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClasesProvider>
            <App />
        </ClasesProvider>
    </StrictMode>
);
