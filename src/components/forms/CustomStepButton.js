import React from "react";
import { Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './formStyles';

const CustomStepButton = ({step, isSubmitting, setStep, isLastStep}) => {
  const classes = useStyles()
  return (
    <div className={classes.button}>
      {step > 0 ? (
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
      ) : null}
        <Button
          startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          type="submit"
          // onClick={()=>console.log(values)}
        >
          {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
        </Button> 
    </div>
  )
};

export default CustomStepButton