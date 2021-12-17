import { PureComponent } from 'react';

import { Menu, MenuProps } from '@mui/material';

class DropdownMenu extends PureComponent<MenuProps> {
  render() {
    return (
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        elevation={2}
        {...this.props}
      />
    );
  }
}

export default DropdownMenu;
