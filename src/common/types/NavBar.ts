
import { faUsers, faServer, faCompass, faFileAlt, faWallet } from "@fortawesome/free-solid-svg-icons";

export type NavItem = {
  label: string,
  icon: any
}

export const NavItems: NavItem[] = [
  {
    label: 'Nodes',
    icon: faServer,
  },
  {
    label: 'Validators',
    icon: faUsers
  },
  {
    label: 'Explorer',
    icon: faCompass,
  },
  {
    label: 'Contracts',
    icon: faFileAlt,
  },
  {
    label: 'Wallets',
    icon: faWallet,
  },
];