import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HashLink } from 'react-router-hash-link';
import { LinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LayersIcon from '@material-ui/icons/Layers';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <HashLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


export const mainListItems = (
  <div>
    <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
    <ListItemLink to="/organization" primary="Organization" icon={<AccountBalanceIcon />} />
    <ListItemLink to="/employees" primary="Employees" icon={<PeopleIcon />} />
    <ListItemLink to="/integrations" primary="Integrations" icon={<LayersIcon />} />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItemLink to="/projects" primary="Projects" icon={<ImportContactsIcon />} />
  </div>
);
