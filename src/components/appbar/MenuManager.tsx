import { ComponentClass, FunctionComponent, createElement, memo, useState } from 'react';

interface Props<P> {
  menus: {
    _default: FunctionComponent<P> | ComponentClass<P> | string;
    [name: string]: FunctionComponent<P> | ComponentClass<P> | string;
  };
}

const MenuManager = ({
  menus,
}: Props<{ onSwitchMenu: (nextMenu: string) => void; onMenuBack: () => void }>) => {
  const [selectedMenuName, setSelectedMenuName] = useState<keyof typeof menus>('_default');
  const handleSwitchMenu = (newMenuName: string) =>
    setSelectedMenuName(newMenuName as keyof typeof menus);
  const handleMenuBack = () => handleSwitchMenu('_default');

  return createElement(menus[selectedMenuName] ?? '', {
    onSwitchMenu: handleSwitchMenu,
    onMenuBack: handleMenuBack,
  });
};

export default memo(MenuManager);
