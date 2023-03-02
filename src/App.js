import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const { user } = useSelector((state) => state.user_store);
  
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarMenu />
        <Routes>
          <Route exact path="/homepage" element={<Homepage/>}/>
          <Route exact path="/login" element={ user.id ? <Homepage/> : <LoginForm />}/>
          <Route exact path="/signup" element={ !user.id ? <RegisterForm /> : <LoginForm />}/>
          <Route exact path="/email-confirmation" element={ !user.id ?  <EmailConfirmation /> : <LoginForm /> }/>
          <Route exact path='/pricing' element={<SubscribePage/>}/>
          <Route exact path='/reset-password' element={ !user.id ?  <ResetPasswordEmail /> : <LoginForm />}/>
          <Route exact path='/new-password' element={ !user.id ? <NewPassword /> : <LoginForm />}/>
          <Route path='/settings' element={<Settings />} />
          <Route path='/settings?:type' element={<Settings />} />
          
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
