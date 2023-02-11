import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { HomePage, JoinVote, NewVote, Vote, VoteSuccess} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new",
    element: <NewVote />,
  },
  {
    path: "/join",
    element: <JoinVote />,
  },
  {
    path: "/vote/:id",
    element: <Vote />,
  },
  {
    path: "/vote/:id/success",
    element: <VoteSuccess />,
  },
]);

function App() {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-base-200">
          <RouterProvider router={router} />
        </div>
    );
}

export default App;
