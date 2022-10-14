import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <header>
        <Link to='/login'>Login</Link>
      </header>
      <div className="container">
            <h2>Super Cool Interactive Map Under Construction</h2>
      </div>
    </>
  );
}

export default LandingPage;
