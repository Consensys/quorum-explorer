import {
  MdSpaceDashboard,
  MdOutlineExplore,
  MdDescription,
} from 'react-icons/md';
import { FaServer } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type NavItem = {
  label: string,
  icon: IconType
}

export const NavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: MdSpaceDashboard,
  },
  {
    label: 'Nodes',
    icon: FaServer,
  },
  {
    label: 'Explorer',
    icon: MdOutlineExplore,
  },
  {
    label: 'Contracts',
    icon: MdDescription,
  },
];