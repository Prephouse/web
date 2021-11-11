import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const PlainRouterLink = (props: any) => <StyledLink {...props} />;

export default PlainRouterLink;
