import React from "react";

const CustomStepButton = ({step, isSubmitting, setStep, isLastStep}) => {

  return (
    <div>
      {step > 0 ? (
          <button
            disabled={isSubmitting}
            className="btn btn-primary"
            type="button"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
      ) : null}
        <button
          // startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          disabled={isSubmitting}
          // variant="contained"
          // color="primary"
          className="btn btn-primary"
          type="submit"
        >
          {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
        </button> 
    </div>
  )
};

export default CustomStepButton