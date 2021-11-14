import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const PlainRouterLink = (props: RouterLinkProps) => <StyledLink {...props} />;

export default PlainRouterLink;
