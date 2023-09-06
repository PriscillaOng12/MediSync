import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { Axios } from '../../../api';
import { error_alert, success_alert } from '../../../utils';
import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const GoogleAuthButton = () => {
  const [loading, setLoading] = useState(false)

  const responseGoogle = (response) => {
    setLoading(true)
    if (response && Object.keys(response).length > 0 && response.accessToken) {
      syncWithGoogle(response.accessToken)
    } else {
      setLoading(false)
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '638559614896-15tvvrqbil6d4kc5tr7npa9nqut9vre9.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const syncWithGoogle = async (token) => {
    let payload = {
      token: token,
    }
    try {
      const result = await Axios.post("api/calendar/sync", payload, { requestId: "sync-with-google" });
      success_alert("your calendar is synced with your google calendar now!");
      setLoading(false)
    } catch (e) {
      if (e.response) {
        error_alert(JSON.stringify(e.response.data.description))
      } else {
        error_alert("Network Error!")
      }
    }
    setLoading(false)
  }

  return (
    <GoogleLogin
      clientId="638559614896-15tvvrqbil6d4kc5tr7npa9nqut9vre9.apps.googleusercontent.com"
      buttonText="Sync With Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={renderProps => (
        <button type="button" disabled={loading} onClick={renderProps.onClick}
          className='btn btn-small flex items-center space-x-3 justify-center text-black'>
          {
            loading ?
              <BiLoaderAlt className='text-primary animate-spin text-2xl' />
              :
              <>

                <FcGoogle className="text-2xl" />
                <p>
                  Sync With Google Calendar
                </p>
              </>
          }
        </button>
      )}
      scope="https://www.googleapis.com/auth/calendar.events" // Request permission for calendar events
      accessType="offline" // Request refresh token for offline access
      cookiePolicy={'single_host_origin'} // Ensure the button is enabled
    />
  );
};

export default GoogleAuthButton;
