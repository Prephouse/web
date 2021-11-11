import React from "react";
import { useIntl } from "react-intl";
import { Grid, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import members from "./members";
import HorizontalCard from "../common/HorizontalCard";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const TeamPanel = () => {
  const intl = useIntl();

  return (
    <section id="prephouse-team">
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "about.team" })}
      </Typography>
      <Grid container direction="column" wrap="wrap" spacing={3}>
        {members.map(member => {
          const sites = [
            { href: member.website, nameId: "general.action.website", Icon: LinkIcon },
            { href: member.linkedin, nameId: "general.action.linkedin", Icon: LinkedInIcon },
            { href: member.github, nameId: "general.action.github", Icon: GitHubIcon },
          ];

          return (
            <Grid item key={member.name}>
              <HorizontalCard
                img={<img src={`/images/${member.img}`} alt={member.name} width={240} height={240} />}
                header={
                  <b>{member.name}</b>
                }
                body={member.bio}
                actions={sites}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default React.memo(TeamPanel);