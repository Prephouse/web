import { CSSProperties, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
  [x: string]: unknown;
}

const Flex = ({ children, style, ...otherProps }: Props) => (
  <div style={{ display: 'flex', width: '100%', ...style }} {...otherProps}>
    {children}
  </div>
);

export default Flex;
