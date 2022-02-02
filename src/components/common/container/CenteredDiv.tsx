import { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  style?: CSSProperties;
  children?: ReactNode;
}

const CenteredDiv = ({ style, children, ...otherProps }: Props) => (
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}
    {...otherProps}
  >
    {children}
  </div>
);

export default CenteredDiv;
