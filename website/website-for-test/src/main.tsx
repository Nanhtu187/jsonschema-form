import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TailwindExample } from "./website/tailwind";
import { AntdExample } from "./website/antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test-tailwind",
    element: <TailwindExample />,
  },
  {
    path: "test-antd",
    element: <AntdExample />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
