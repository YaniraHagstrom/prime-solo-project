import React from 'react';
import './aboutPage.css';
import Typography from '@mui/material/Typography';

function AboutPage() {
  return (
    <div className='about'>
    <div className="left">
      <div >
          <Typography sx={{ textTransform:'capitalize' ,mb: 1, fontWeight: 600}} component="div" variant="h6">
          Technologies Used:
          </Typography> 
          <ul>
            <li>Javascript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Node</li>
            <li>React</li>
            <li>Redux</li>
            <li>Redux-Sagas</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>MUI</li>
          </ul>
      </div>
      <div className='challenge'>
          <Typography sx={{ textTransform:'capitalize' ,mb: 1, fontWeight:  600}} component="div" variant="h6">
          Biggest Challenge:
          </Typography> 
          <Typography sx={{ml: 1, mb: 1}} component="div" variant="h8">
            Working with data from 10 different tables to generate search result based on the user's selected criteria.  
          </Typography> 
      </div>
    </div>
    <div className='right'>
        <Typography sx={{ textTransform:'capitalize' ,mb: 1, fontWeight:  600}} component="div" variant="h6">
        Special Thanks To:
        </Typography> 
        <Typography sx={{ml: 1, mb: 1, width: 400}} component="div" variant="h8">
          <ul>
            <li>My beautiful family for providing the inspiration to develop this app and for their continuing support. </li>
            <li>My fellow L'Englains. </li>
            <li>Prime</li>
          </ul>

          </Typography>
    </div>
    </div>
  );
}

export default AboutPage;
