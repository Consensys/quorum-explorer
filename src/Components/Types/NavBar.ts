



import { faDesktop, faServer, faCompass, faFileAlt } from "@fortawesome/free-solid-svg-icons";

export type NavItem = {
  label: string,
  icon: any
}

export const NavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: faDesktop
  },
  {
    label: 'Nodes',
    icon: faServer,
  },
  {
    label: 'Explorer',
    icon: faCompass,
  },
  {
    label: 'Contracts',
    icon: faFileAlt,
  },
];