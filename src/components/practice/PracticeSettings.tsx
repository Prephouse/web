import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import FormButtons from "../common/FormButtons";

// TODO i18n
const PracticeSettings = () => {
  return (
    <>
      <Box sx={{ padding: theme => theme.spacing(3) }}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Type</FormLabel>
          <FormHelperText>Choose between an interview or presentation for this session</FormHelperText>
          <RadioGroup row name="radio-buttons-group-type">
            <FormControlLabel value="interview" control={<Radio />} label="Interview" />
            <FormControlLabel value="presentation" control={<Radio />} label="Presentation" />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          An interview consists of an introduction from you and multiple questions asked by our system and to
          be answered by you.
        </Alert>
      </Box>
      <Box sx={{ padding: theme => theme.spacing(3) }}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Medium</FormLabel>
          <FormHelperText>Choose whether to record and analyze both audio and video, or audio only</FormHelperText>
          <RadioGroup row name="radio-buttons-group-medium">
            <FormControlLabel value="video" control={<Radio />} label="Video and audio" />
            <FormControlLabel value="audio" control={<Radio />} label="Audio only" />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          You will be required to show your face throughout the ______ and use your voice to
          conduct the _____. You will receive the full set of feedback after the _____ has been completed.
        </Alert>
      </Box>
      <Box sx={{ padding: theme => theme.spacing(3) }}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Source</FormLabel>
          <FormHelperText>Choose whether to record a new ______ on our website or upload an existing (pre-recorded)
          _______ </FormHelperText>
          <RadioGroup row name="radio-buttons-group-medium">
            <FormControlLabel value="video" control={<Radio />} label="Record New" />
            <FormControlLabel value="audio" control={<Radio />} label="Upload Existing" />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          You will be required to use your webcam and microphone through your browser in order to record a new
          _______ on our website. You will receive instructions on how to perform the recording before you start.
        </Alert>
      </Box>
      <Box sx={{ padding: theme => theme.spacing(3) }}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Live Feedback</FormLabel>
          <FormHelperText>Choose whether to receive some feedback as you go</FormHelperText>
          <RadioGroup row name="radio-buttons-group-live">
            <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
            <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          You will receive some, but not all, automated feedback from our system as you go. You can use that
          feedback to improve your skills along the way!
        </Alert>
      </Box>
      <FormButtons
        primaryText="Confirm settings"
        secondaryText="Contact us for help"
        secondaryColor="warning"
      />
    </>
  );
}

export default PracticeSettings;
