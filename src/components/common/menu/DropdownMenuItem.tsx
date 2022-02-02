import { PureComponent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';

import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material';

interface Props extends MenuItemProps {
  primary: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: ReactNode;
  [prop: string]: unknown;
}

class DropdownMenuItem extends PureComponent<Props> {
  override render() {
    const { primary, icon, selected = false, onClick, children, ...otherProps } = this.props;
    return (
      <MenuItem onClick={onClick} selected={selected} {...otherProps}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
        {children}
      </MenuItem>
    );
  }
}

export default DropdownMenuItem;
