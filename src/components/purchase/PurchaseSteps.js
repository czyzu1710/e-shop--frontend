import React, { useState } from "react";
import { Cart } from "./cart/Cart";
import OrderSummary from "./order/summary/OrderSummary";
import { ThankYouPage } from "./ThankYouPage";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./PurchaseSteps.css";

export const PurchaseSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Koszyk", "Zamówienie", "Płatność"];

  const [stepperHidden, setStepperHidden] = useState(false);

  const [collectData, setCollectData] = useState({});

  const handleNextStep = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };

  const handleStepBack = (index) => {
    if (index < activeStep) {
      setActiveStep(index);
    }
  };

  const dataToSend = (data) => {
    setCollectData(data);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Cart handleNextStep={handleNextStep} />;
      case 1:
        return <OrderSummary handleNextStep={handleNextStep} handleData={dataToSend}/>;
      case 2:
        return <ThankYouPage setHidden={() => setStepperHidden(true)} dataToSend={collectData}/>;
      default:
        return <Typography>Błąd</Typography>;
    }
  };

  return (
    <Box className="purchase-steps-main-container">
      <Stepper
        activeStep={activeStep}
        style={{ width: "65vw" }}
        hidden={stepperHidden}
      >
        {steps.map((label, index) => (
          <Step key={index} onClick={() => handleStepBack(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
    </Box>
  );
};
