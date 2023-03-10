import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NavbarMenu from './components/Sections/NavbarMenu';
import SubscribePage from './components/Sections/SubscribePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import EmailConfirmation from './components/Sections/EmailConfirmation';
import ResetPasswordEmail from './components/Sections/ResetPasswordEmail';
import NewPassword from './components/Sections/NewPassword';
import NotFoundPage from './pages/NotFoundPage';
import { useSelector } from 'react-redux'
import Settings from './pages/SettingsPages/Settings';
import Spinner from './components/Spinner';
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { user, loggedIn } = useSelector((state) => state.user_store);

  return (
    <div className="App">
        <BrowserRouter>
          <NavbarMenu />
          <Routes>
            {!loggedIn ?
              <Route path="*" element={<Spinner />} />
              :
              <>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/homepage" element={<Homepage />} />
                <Route exact path="/login" element={!user.id ? <LoginForm /> : <Navigate to='/homepage' />} />
                <Route exact path="/signup" element={!user.id ? <RegisterForm /> : <Navigate to='/homepage' />} />
                <Route exact path="/email-confirmation" element={!user.id ? <EmailConfirmation /> : <Navigate to='/homepage' />} />
                <Route exact path='/pricing' element={<SubscribePage />} />
                <Route exact path='/reset-password' element={!user.id ? <ResetPasswordEmail /> : <Navigate to='/homepage' />} />
                <Route exact path='/new-password' element={!user.id ? <NewPassword /> : <Navigate to='/homepage' />} />
                <Route path='/settings' element={!user.id ? <Navigate to='/homepage' /> : <Settings />} />
                <Route path='/settings?:type' element={!user.id ? <Navigate to='/homepage' /> : <Settings />} />
                <Route path="*" element={<NotFoundPage />} />
              </>
            }
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
