import App from 'next/app';
import '../styles/globals.css'
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const Myapp = (props) =>{
    const usuario = useAutenticacion();
    

    const { Component, pageProps } = props;

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>

    );
}

export default Myapp;





/*import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
*/