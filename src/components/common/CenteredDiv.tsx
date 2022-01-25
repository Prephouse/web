import { CSSProperties, HTMLProps, ReactNode } from 'react';

import Flex from 'components/common/Flex';

interface Props extends HTMLProps<HTMLDivElement> {
  style?: CSSProperties;
  children?: ReactNode;
}

const CenteredDiv = ({ style, children, ...otherProps }: Props) => (
  <Flex style={{ justifyContent: 'center', alignItems: 'center', ...style }} {...otherProps}>
    {children}
  </Flex>
);

export default CenteredDiv;
