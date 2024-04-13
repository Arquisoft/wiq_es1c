import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export const Footer= () => {
  return (
    <MDBFooter  className='bg-teal-50 dark:bg-zinc-800'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}