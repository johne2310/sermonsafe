import { PageInterface } from "../models/page.interface";

const appPages: PageInterface[] = [
  {
    title: "Sermons",
    name: "TabsPage",
    tabName: "SermonsPage",
    index: 0,
    icon: "document"
  },

  {
    title: "About",
    name: "TabsPage",
    tabName: "AboutPage",
    index: 1,
    icon: "information-circle"
  }
];

export const APP_PAGES = appPages;
