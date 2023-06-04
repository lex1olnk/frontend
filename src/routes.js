import { Component } from "react"
import { TITLE_ROUTE, ADMIN_ROUTE, USER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "./content/utils/consts"
import AddTitlePage from "./content/screens/AddTitlePage"
import AdminPage from "./content/screens/AdminPage"
import TitlePage from "./content/screens/TitlePage"
import UserPage from "./content/screens/UserPage"
import AuthPage from "./content/screens/AuthPage"
import HomePage from "./content/screens/HomePage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
    {
        path: TITLE_ROUTE + '/add',
        Component: <AddTitlePage />
    }
]

export const publicRoutes = [
    {
        path: TITLE_ROUTE + '/:id',
        Component: TitlePage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: <UserPage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <AuthPage />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <AuthPage />
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    }

]