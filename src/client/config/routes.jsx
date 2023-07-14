import { Home, Month } from "../pages";

export const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    name: "month",
    path: "/month",
    element: <Month />,
    exact: true,
  },
];
