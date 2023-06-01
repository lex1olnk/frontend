import AdminPage from "./content/screens/AdminPage";
import AuthPage from "./content/screens/AuthPage";
import TitlePage from "./content/screens/TitlePage";
import UserPage from "./content/screens/UserPage";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TITLE_ROUTE, USER_ROUTE } from "./content/utils/consts";
import HomePage from "./content/screens/HomePage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
]

export const publicRoutes = [
    {
        path: TITLE_ROUTE + '/:id',
        Component: TitlePage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: HOME_ROUTE,
        Component: <HomePage />
    }

]