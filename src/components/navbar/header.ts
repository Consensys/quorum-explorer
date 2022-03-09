import {
  MdSpaceDashboard,
  MdOutlineExplore,
  MdDescription,
} from 'react-icons/md';
import { FaServer } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface dataType {
  label: string,
  icon: IconType
}

export const headers: dataType[] = [
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