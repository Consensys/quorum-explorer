import {
  MdSpaceDashboard,
  MdOutlineExplore,
  MdDescription,
} from 'react-icons/md';
import { FaServer } from 'react-icons/fa';

export const data = [
  {
    label: 'Dashboard',
    icon: <MdSpaceDashboard />,
  },
  {
    label: 'Nodes',
    icon: <FaServer />,
  },
  {
    label: 'Explorer',
    icon: <MdOutlineExplore />,
  },
  {
    label: 'Contracts',
    icon: <MdDescription />,
  },
];
