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
  

  return (
      <div className="landingContainer">
        <div className='globe'>
          <img className='globeImage' src={require('./logo.png')}/>
        </div>
        { !loginForm ?
          <div className='formLayout'>
            <div className='blurb'>
              <Typography sx={{ color: 'white', textAlign: 'center', mb: 4 }} component="div" variant="h4">
                ECDS Abroad helps parents find early childhood developmental service providers all across the world. 
              </Typography> 
              <Typography sx={{ color: 'white' }} component="div" variant="h6">
                                    {/* 👇 sets loginForm to True => Renders LoginForm */}
              <Button onClick={()=> setLoginForm(!loginForm)}>Login / Register</Button>
              to Find Providers 
              </Typography>
            </div>
          </div>
          : // login or register form?
          <div className='formLayout'>
            {/* if registerForm is false, then render the login page */}
            { !registerForm ? 
              <div className='loginForm'>
                <LoginForm/> 
                    <Typography 
                    sx={{ color: 'white', mt: 2  }} 
                    component="div" variant="h9">Don't Have An Account? 
                                      {/* 👇 sets registerForm to true => Renders RegisterForm */}
                      <Button onClick={()=> setRegisterForm(!registerForm)}> Register</Button>
                    </Typography>
                <Button variant="text" onClick={handleClick}>cancel</Button>
              </div>
            :
              <div className='loginForm'>
                  <RegisterForm/> 
                  <Typography 
                  sx={{ color: 'white', mt: 2 }} 
                  component="div" variant="h9">Already have an account? 
                    <Button onClick={()=> setRegisterForm(!registerForm)}> Login</Button>
                  </Typography>
                <Button variant="text" onClick={handleClick}>cancel</Button>
              </div>
            }

          </div>
        }
        <div className='form'>

        </div>
      </div>
  );
}

export default LandingPage;
