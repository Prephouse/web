import { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  style?: CSSProperties;
  children?: ReactNode;
}

const Flex = ({ children, style, ...otherProps }: Props) => (
  <div style={{ display: 'flex', width: '100%', ...style }} {...otherProps}>
    {children}
  </div>
);

export default Flex;
