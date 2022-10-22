import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';



function LandingPage() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className='landingPage'>
      <header>
        {/* <Link to='/login'>Login</Link> */}
      </header>
      <div className="container">
            
      </div>
    </div>
  );
}

export default LandingPage;
