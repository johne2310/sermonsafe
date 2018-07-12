import { PageInterface } from '../models/page.interface';

const loggedInPages: PageInterface[] = [
    {
        title: 'Account',
        name: 'AccountPage',
        icon: 'person'
    },
    {
        title: 'Support',
        name: 'SupportPage',
        icon: 'help'
    },
    {
        title: 'Logout',
        name: 'TabsPage',
        icon: 'log-out',
        logsOut: true
    }

]

export const LOGGED_IN_PAGES = loggedInPages;