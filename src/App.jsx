import { AuthGoogleProvider } from './context/authGoogle.jsx';
import AplicationRoutes from './routes/index.jsx';

function App() {
  return (
    <>
      <AuthGoogleProvider>
        <AplicationRoutes />
      </AuthGoogleProvider>
    </>
  );
}

export default App;
