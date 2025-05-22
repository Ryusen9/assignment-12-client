import React from 'react'
import { useLocation } from 'react-router-dom';

const VolunteerHome = () => {
    const {state} = useLocation();
    const req = state?.req;
    console.log(req);
  return (
    <div>VolunteerHome</div>
  )
}

export default VolunteerHome