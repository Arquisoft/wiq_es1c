import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
//import './Footer.css';

export const Footer= () => {
  const { t } = useTranslation();

  return (
    
    <MDBFooter  className='footer text-black dark:text-white bg-teal-50 dark:bg-zinc-800' style={{position: 'relative', bottom: 0, width: '100%', padding: '10px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <div className='footer-content' style={{textAlign: 'center'}}>
        &copy; {new Date().getFullYear()}{' '}
        <a  href='https://github.com/Arquisoft/wiq_es1c'>
          Wiq_es1c.
        </a>
        <p>{ t('Footer.copyright') }</p>
      </div>
    </MDBFooter>
  );
}