import { useEffect, useState } from 'react'
import {
  AppBar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Fab,
  FormGroup,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  Toolbar,
  Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import logo from './images/logo.png'
import delivery from './images/delivery.png'
import allOrders from './utils/orders.json'
import './App.css'

const App = () => {
  const [open, setOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [number, setNumber] = useState('')
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState('')
  const [name, setName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [landmark, setLandmark] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [checked, setChecked] = useState(false)
  const [time, setTime] = useState('')
  const [tip, setTip] = useState('')

  useEffect(() => {
    ValidatorForm.addValidationRule('isRadioSelected', (value) => {
      if (value) return true
      return false
    })
    return () => {
      ValidatorForm.removeValidationRule('isRadioSelected')
    }
  })

  const handleOpen = () => {
    setOrders(
      allOrders
        .filter((order) => order.mobileNumber === number)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    )
    setActiveStep(1)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleNext = () => {
    if (activeStep === 0)
      setOrders(
        allOrders
          .filter((order) => order.mobileNumber === number)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      )
    // if (activeStep === steps.length - 1)  send Data to backend
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
    setChecked(false)
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
        <TextValidator
          label="Mobile Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          name="mobile number"
          type="number"
          sx={{ m: 1, width: '30ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
          validators={[
            'required',
            'minNumber:1000000000',
            'maxNumber:9999999999',
          ]}
          errorMessages={[
            'this field is required',
            'enter a valid phone number',
            'enter a valid phone number',
          ]}
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
          control={<Checkbox validators={['required']} />}
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
          <TextValidator
            label="Name"
            type="name"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <br />
          <TextValidator
            label="Address Line 1"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <br />
          <TextValidator
            label="Address Line 2"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <br />
          <TextValidator
            label="Landmark (Optional)"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
          <br />
          <TextValidator
            label="City"
            sx={{ m: 1, width: '50ch' }}
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <br />
          <TextValidator
            label="Pin Code"
            sx={{ m: 1, width: '20ch' }}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            validators={['required', 'minNumber:100000', 'maxNumber:999999']}
            errorMessages={[
              'this field is required',
              'enter a valid pincode',
              'enter a valid pincode',
            ]}
          />
        </Box>
      ),
    },
    {
      label: 'Delivery Timing',
      description: (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose a suitable Time Slots:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Choose a suitable Time Slots:"
            onChange={(e) => setTime(e.target.value)}
          >
            <MenuItem value={0}>9:00 AM - 10:00 AM</MenuItem>
            <MenuItem value={1}>10:00 AM - 11:00 AM</MenuItem>
            <MenuItem value={2}>11:00 AM - 12:00 PM</MenuItem>
            <MenuItem value={3}>12:00 PM - 1:00 PM</MenuItem>
            <MenuItem value={4}>1:00 PM - 2:00 PM</MenuItem>
            <MenuItem value={5}>6:00 PM - 7:00 PM</MenuItem>
            <MenuItem value={6}>7:00 PM - 8:00 PM</MenuItem>
            <MenuItem value={7}>8:00 PM - 9:00 PM</MenuItem>
            <MenuItem value={8}>9:00 PM - 10:00 PM</MenuItem>
          </Select>
        </FormControl>
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
            <TextValidator
              label="Tip Amount"
              sx={{ m: 1, width: '30ch' }}
              type="number"
              disabled={!checked}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              validators={checked ? ['required'] : []}
              errorMessages={checked ? ['this field is required'] : []}
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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h3"
            align="left"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              padding: '2rem',
            }}
          >
            Get your Orders delivered at Home
          </Typography>
          <Typography
            align="left"
            style={{
              margin: '0px 0px 16px',
              fontFamily: 'Montserrat',
              lineHeight: 1.5,
              fontWeight: 400,
              fontSize: '24px',
              color: 'rgb(124, 124, 124)',
              padding: '0 2rem',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Ut volutpat sollicitudin facilisis. Vestibulum convallis
            quis.
          </Typography>
          <ValidatorForm
            className="Form1"
            onSubmit={handleOpen}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              label="Mobile Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              name="mobile number"
              type="number"
              sx={{ m: 1, width: '30ch' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              validators={[
                'required',
                'minNumber:1000000000',
                'maxNumber:9999999999',
              ]}
              errorMessages={[
                'this field is required',
                'enter a valid phone number',
                'enter a valid phone number',
              ]}
            />
            <Fab
              variant="extended"
              type="submit"
              sx={{
                m: 1,
                backgroundColor: 'rgb(0, 147, 227)',
                color: '#fff',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgb(0, 102, 158);',
                },
              }}
            >
              Get Home Delivery
            </Fab>
          </ValidatorForm>
        </Grid>
        <Grid item xs={0} sm={6}>
          <img
            id="Delivery"
            src={delivery}
            alt="delivery"
            style={{ height: '80vh' }}
          />
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          margin: 0,
          padding: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <Card
          sx={{
            position: 'absolute',
            width: '90%',
            maxWidth: '700px',
            margin: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
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
                    <ValidatorForm
                      onSubmit={handleNext}
                      onError={(errors) => console.log(errors)}
                    >
                      {step.description}
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1
                              ? 'Checkout'
                              : 'Continue'}
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
                    </ValidatorForm>
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
        </Card>
      </Modal>
    </div>
  )
}

export default App
