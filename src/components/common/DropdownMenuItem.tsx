import React, { PureComponent } from 'react';

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

interface Props {
  primary: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: React.ReactNode;
  [x: string]: any;
}

class DropdownMenuItem extends PureComponent<Props> {
  render() {
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
