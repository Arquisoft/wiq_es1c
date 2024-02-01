import React from 'react';

import router from './routers/AppRouter';
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <RouterProvider router={ router } />
    /*<Container className='min-h-screen'>
      <Container className='bg-white p-5' component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
          Welcome to wiq_es1c
        </Typography>
          {showLogin ? <Login /> : <AddUser />}
        <Typography component="div" align="center" sx={{ marginTop: 2 }}>
          {showLogin ? (
            <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
              Don't have an account? Register here.
            </Link>
          ) : (
            <Link component="button" variant="body2" onClick={handleToggleView}>
              Already have an account? Login here.
            </Link>
          )}
        </Typography>
      </Container>
    </Container>*/
  );
}

export default App;
