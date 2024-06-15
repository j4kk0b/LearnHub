import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import AppLayout from "./components/AppLayout";
import MainPage from "./pages/main/MainPage";
import NotesPage from "./pages/notes/NotesPage";
import TestsPage from "./pages/tests/TestsPage";
import ContactPage from "./pages/contact/ContactPage";
import Note from "./pages/notes/Note";
import NewNote from "./pages/notes/NewNote";

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
        element: <NewNote />,
      },
      {
        path: "/notatki/:noteId",
        element: <Note />,
      },
      {
        path: "testy",
        element: <TestsPage />,
      },
      { path: "kontakt", element: <ContactPage /> },
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
