import { PageInterface } from '../models/page.interface';


const appPages: PageInterface[] = [

    {
        title: 'Sermons',
        name: 'TabsPage',
        tabName: 'SermonsPage',
        index: 0,
        icon: 'document'
    },
    {
        title: 'Schedule',
        name: 'TabsPage',
        tabName: 'SchedulePage',
        index: 1,
        icon: 'calendar'
    },
    {
        title: 'Speakers',
        name: 'TabsPage',
        tabName: 'SpeakerListPage',
        index: 2,
        icon: 'contacts'
    },
    {
        title: 'About',
        name: 'TabsPage',
        tabName: 'AboutPage',
        index: 3,
        icon: 'information-circle'
    }
];

export const APP_PAGES = appPages;
