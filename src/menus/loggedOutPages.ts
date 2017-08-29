import { PageInterface } from "../models/page.interface";


const loggedOutPages: PageInterface[] = [
    {
        title: 'Login',
        name: 'LoginPage',
        icon: 'log-in'
    },
    {
        title: 'Support',
        name: 'SupportPage',
        icon: 'help'
    },
    {
        title: 'Signup',
        name: 'SignupPage',
        icon: 'person-add'
    }
];

export const LOGGED_OUT_PAGES = loggedOutPages;