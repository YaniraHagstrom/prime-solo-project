import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';
import Button from '@mui/material/Button';
import LoginForm from '../LoginForm/LoginForm';
import Typography from '@mui/material/Typography';
import RegisterForm from '../RegisterForm/RegisterForm';


function LandingPage() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const handleClick =()=> {
    setLoginForm(false);
    setRegisterForm(false);
  }
  console.log(loginForm)

  return (
    <div className='landingPage'>

      
      <div className="landingContainer">
        <div className='globe'>
          <img className='globeImage' src={require('./logo.png')}/>
        </div>
        { !loginForm ?
          <div className='blurb'>
            <div>
              <Typography component="div" variant="h4">fun blurb about site</Typography> 
              <Typography component="div" variant="h9">
                                    {/* 👇 sets loginForm to True => Renders LoginForm */}
              <Button onClick={()=> setLoginForm(!loginForm)}>Login / Register</Button>
              to Find Providers 
              </Typography>
            </div>
          </div>
          : // login or register form?
          <div className='blurb'>
            {/* if registerForm is false, then render the login page */}
            { !registerForm ? 
              <div>
                <LoginForm/> 
                    <Typography component="div" variant="h9">Don't Have An Account? 
                                      {/* 👇 sets registerForm to true => Renders RegisterForm */}
                      <Button onClick={()=> setRegisterForm(!registerForm)}> Register Here</Button>
                    </Typography>
                <Button variant="text" onClick={handleClick}>cancel</Button>
              </div>
            :
              <div>
                  <RegisterForm/> 
                  <Typography component="div" variant="h9">Already have an account? 
                    <Button onClick={()=> setRegisterForm(!registerForm)}> Login Here</Button>
                  </Typography>
                <Button variant="text" onClick={handleClick}>cancel</Button>
              </div>
            }
            <header></header>

          </div>
        }
        <div className='form'>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
