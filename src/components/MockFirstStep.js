import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import MembershipContext from "./MembershipContext";

const MockFirstStep = ({ setStep }) => {
  const history = useHistory();
  const navigateTo = () => history.push('/form')
  const { setIsExistingMember } = useContext(MembershipContext)

  const isMember = () => {
    setIsExistingMember(true)
    navigateTo()
    setStep(2)
  }

  const newMember = () => {
    setIsExistingMember(false)
    navigateTo()
    setStep(0)
  }

  return (
    <>
      <h2> Are you existing member? </h2>
        <button onClick={isMember}>Yes</button>
        <button onClick={newMember}>No</button>

        <a className="btn btn-primary margin-10" href="http://localhost:8090/login">Login</a>
    </>
  )
}

export default MockFirstStep