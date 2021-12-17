import { CSSProperties, ReactNode } from 'react';

import Flex from './Flex';

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
  [x: string]: unknown;
}

const CenteredDiv = ({ style, children, ...otherProps }: Props) => (
  <Flex style={{ justifyContent: 'center', alignItems: 'center', ...style }} {...otherProps}>
    {children}
  </Flex>
);

export default CenteredDiv;
