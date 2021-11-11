import { NAVIGATION_BLACK } from "../../styles/colours";
import { Box } from "@mui/material";

const Footer = () => (
  <Box component="footer" bgcolor={NAVIGATION_BLACK} color="primary.contrastText">
      <p>
        &copy; 2021 Prephouse. All rights reserved.
      </p>
  </Box>
)

export default Footer;
