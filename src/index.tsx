import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CreateBookLayout } from './layouts/CreateBookLayout';
import { HomeLayout } from './layouts/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>    
    <Routes>
      <Route path="/" element={ <HomeLayout/> }/>   
      <Route path="/create-book" element={ <CreateBookLayout/> }/>       
    </Routes>    
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
