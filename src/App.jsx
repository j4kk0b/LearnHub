import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import AppLayout from "./components/AppLayout";
import MainPage from "./pages/main/MainPage";
import NotesPage from "./pages/notes/NotesPage";
import TestsPage from "./pages/tests/TestsPage";
import ContactPage from "./pages/contact/ContactPage";
import Note from "./pages/notes/Note";
import NewNote from "./pages/notes/NewNote";
import TestLoader from "./components/TestLoader";
import Login from "./pages/auth/Login";
import RequireAuth from "./pages/auth/RequireAuth";
import Rank from "./pages/rank/Rank";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "notatki",
        element: <NotesPage />,
      },
      {
        path: "/notatki/dodaj",
        element: (
          <RequireAuth redirectTo={"/login"}>
            <NewNote />
          </RequireAuth>
        ),
      },
      {
        path: "/notatki/:noteId",
        element: <Note />,
      },
      {
        path: "testy",
        element: <TestsPage />,
      },
      {
        path: "/testy/:testId",
        element: <TestLoader />,
      },
      { path: "ranking", element: <Rank /> },
      { path: "kontakt", element: <ContactPage /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <IconContext.Provider value={{ size: "1rem", className: "nav-icon" }}>
      <RouterProvider router={router} />;
    </IconContext.Provider>
  );
}

export default App;
