import { CSSProperties, ReactNode } from 'react';

import Flex from './Flex';

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
  [x: string]: any;
}

const CenteredDiv = ({ style, children, ...otherProps }: Props) => {
  return (
    <Flex style={{ justifyContent: 'center', alignItems: 'center', ...style }} {...otherProps}>
      {children}
    </Flex>
  );
};

export default CenteredDiv;
