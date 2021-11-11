import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import CenteredDiv from "../common/CenteredDiv";

const Home = () => (
  <>
    <Helmet>
      <title>Prephouse</title>
    </Helmet>
    <CenteredDiv style={{ height: "70vh" }}>
      <Typography component="h2" variant="h5">Welcome to Prephouse</Typography>
    </CenteredDiv>
  </>
)

export default Home;
