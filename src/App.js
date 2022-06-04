import { useState } from 'react'
import {
  AppBar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import logo from './logo.png'
import './App.css'

const allOrders = [
  {
    mobileNumber: '9554409188',
    date: '04 June 2022 12:15:00',
    items: [
      {
        id: 0,
        name: 'Pepsi 2L',
        MRP: 80,
        quantity: 1,
      },
      {
        id: 1,
        name: 'Maggi',
        MRP: 14,
        quantity: 4,
      },
      {
        id: 2,
        name: 'Uncle Chips',
        MRP: 10,
        quantity: 5,
      },
      {
        id: 3,
        name: 'Dairy Milk',
        MRP: 10,
        quantity: 10,
      },
    ],
  },
  {
    mobileNumber: '9554409188',
    date: '04 June 2022 12:30:00',
    items: [
      {
        id: 0,
        name: 'Pepsi 2L',
        MRP: 80,
        quantity: 1,
      },
      {
        id: 1,
        name: 'Maggi',
        MRP: 14,
        quantity: 4,
      },
      {
        id: 2,
        name: 'Uncle Chips',
        MRP: 10,
        quantity: 5,
      },
      {
        id: 3,
        name: 'Dairy Milk',
        MRP: 10,
        quantity: 10,
      },
    ],
  },
]

const App = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [number, setNumber] = useState('')
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [landmark, setLandmark] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [checked, setChecked] = useState(false)
  const [time, setTime] = useState('')
  const [tip, setTip] = useState('')

  const handleNext = () => {
    if (activeStep === 0)
      setOrders(
        allOrders
          .filter((order) => order.mobileNumber === number)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      )
    if (activeStep === steps.length - 1)
      // send Data to backend
      setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setNumber('')
    setOrders([])
    setExpanded('')
    setAddressLine1('')
    setAddressLine2('')
    setLandmark('')
    setCity('')
    setPinCode('')
    setChecked('')
    setTime('')
    setTip('')
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '')
  }

  const steps = [
    {
      label: 'Enter Mobile Number',
      description: (
        <TextField
          label="Mobile Number"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      ),
    },
    {
      label: 'Previous Orders',
      description: orders.map((order, i) => (
        <FormControlLabel
          key={i}
          sx={{
            '&, & .MuiFormControlLabel-label': {
              width: '100%',
            },
          }}
          control={<Checkbox />}
          label={
            <Accordion expanded={expanded === i} onChange={handleChange(i)}>
              <AccordionSummary
                sx={{ '& div': { justifyContent: 'space-between' } }}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{order.date}</Typography>
                <Typography align="right">
                  ₹
                  {order.items
                    .map((item) => item.MRP * item.quantity)
                    .reduce((sum, item) => sum + item)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  {order.items.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        primary={item.name + ' x ' + item.quantity}
                        secondary={'₹ ' + item.MRP * item.quantity}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          }
        />
      )),
    },
    {
      label: 'Enter Delivery Address',
      description: (
        <Box textAlign="left">
          <TextField
            label="House Number / Apartment Number"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <br />
          <TextField
            label="Building / Street Name"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
          <br />
          <TextField
            label="Landmark (Optional)"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
          <br />
          <TextField
            label="City"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <TextField
            label="Pin Code"
            sx={{ m: 1, width: '20ch' }}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </Box>
      ),
    },
    {
      label: 'Delivery Timing',
      description: (
        <FormGroup>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose a suitable Time Slots:
          </FormLabel>
          <RadioGroup
            sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="0"
              control={<Radio />}
              label="9:00 AM - 10:00 AM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="1"
              control={<Radio />}
              label="10:00 AM - 11:00 AM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="2"
              control={<Radio />}
              label="11:00 AM - 12:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="3"
              control={<Radio />}
              label="12:00 PM - 1:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="4"
              control={<Radio />}
              label="1:00 PM - 2:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="6"
              control={<Radio />}
              label="6:00 PM - 7:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="7"
              control={<Radio />}
              label="7:00 PM - 8:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="8"
              control={<Radio />}
              label="8:00 PM - 9:00 PM"
            />
            <FormControlLabel
              sx={{ maxWidth: '200px', width: '90%' }}
              value="9"
              control={<Radio />}
              label="9:00 PM - 10:00 PM"
            />
          </RadioGroup>
        </FormGroup>
      ),
    },
    {
      label: 'Tip delivery Person',
      description: (
        <Box>
          <FormGroup
            sx={{ justifyContent: 'space-around', flexDirection: 'row' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                />
              }
              label="Tip Delivery Guy"
            />
            <TextField
              label="Tip Amount"
              sx={{ m: 1, width: '30ch' }}
              disabled={!checked}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              value={tip}
              onChange={(e) => setTip(e.target.value)}
            />
          </FormGroup>
        </Box>
      ),
    },
  ]

  return (
    <div className="App">
      <AppBar
        position="static"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} className="App-logo" alt="logo" height="100%" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Card sx={{ maxWidth: '700px', width: '90%', margin: 'auto' }}>
        <CardContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 4 ? (
                      <Typography variant="caption">Optional</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  {step.description}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Checkout' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                Your order with order number is <b>#{Date.now()}</b> has been
                placed successfully.
                <br />
                Want to place another order??
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Place Another Order
              </Button>
            </Paper>
          )}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  )
}

export default App
