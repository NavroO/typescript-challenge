import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, TextField } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { Container } from '@mui/system';
import { useState } from 'react';
import { accordionStyles, buttonStyles, inputLabelStyles, summaryStyles, textFieldStyles } from './App.style';

function App() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container>
      <Accordion sx={accordionStyles}>
        <AccordionSummary
          sx={summaryStyles}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: 'center' }}>
            <Typography sx={{margin: 0}}>Personal data</Typography>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Button variant="outlined" disableRipple sx={{
              color: '#F0740D',
              borderColor: '#F0740D',
              '&:hover': {
                borderColor: '#F0740D',
              },
            }}>
              <EditLocationIcon sx={{
                color: '#F0740D',
              }} />
              CHANGE
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <TextField
            sx={textFieldStyles}
            InputLabelProps={{ style: inputLabelStyles }}
            InputProps={{ style: { color: '#F0740D' } }}
            id="custom-text-field"
            label="Name"
            variant="standard"
          />
          <TextField
            sx={textFieldStyles}
            InputLabelProps={{ style: inputLabelStyles }}
            InputProps={{ style: { color: '#F0740D' } }}
            id="custom-text-field"
            label="Email"
            variant="standard"
          />
          <TextField
            sx={textFieldStyles}
            id="custom-text-field"
            InputProps={{ style: { color: '#F0740D' }, endAdornment: showPassword ? <VisibilityOffIcon sx={{ color: '#F0740D' }} onClick={() => setShowPassword(false)} /> : <VisibilityIcon sx={{ color: '#F0740D' }} onClick={() => setShowPassword(true)} /> }}
            InputLabelProps={{ style: inputLabelStyles }}
            label="Password"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
          />
          <Button variant="text" disableRipple sx={buttonStyles}>
            SAVE
          </Button>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default App;
