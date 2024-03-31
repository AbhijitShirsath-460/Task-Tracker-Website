
import './App.css';
import Home from './components/Home/Home';
import {Toaster} from 'react-hot-toast'
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      
      <Home/>

         {/* toast is package its helps us to display something notification,  */}
         <Toaster/>


         

    </div>
  );
}

export default App;
