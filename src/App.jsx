// fontes do MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPrincipal from './componentes/MenuPrincipal';
import NotFound from './componentes/NotFound';
import Home from './componentes/telas/home/Home';
import Login from './componentes/telas/login/Login';
import Camisas from './componentes/telas/camisas/Camisas';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPrincipal />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "camisas",
        element: <Camisas />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
