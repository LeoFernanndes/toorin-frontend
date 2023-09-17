import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {useNavigate, Navigate} from 'react-router-dom'
import AuthService from '../../services/auth.service'; // import com @
import { LoginFormButtonsContainer, LoginFormButtonsFlex,
  HeaderContainer, LoginFormButtonsContainerRow1, LoginFormButtonsContainerRow2 } from './styled';


type CreateBookFormProps = {
  nomeDoBotao: string;
}

type loginFormState = {
  "username": string,
  "password": string,
  "submit": boolean,
  "successfullLogin"?: boolean
}

type ElementLabelName = {
  elemeentLabelname: 'username' | 'password'
}

interface LoginFormState {
  username: string,
  password: string,
  submit: boolean,
  successfullLogin?: boolean
}

function LoginForm(){
  const navigate = useNavigate();
  const navigateToUserRegister = () => {
    navigate('/register')
  }
  const navigateToForgotPassword = () => {
    navigate('/register')
  }

  const initialState: LoginFormState = {
    username: "",
    password: "",
    submit: false
  }

  const [state, setState] = useState(initialState);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    AuthService.login(state.username, state.password)
    .then(response => {
      if (response?.access){
        setState({...state, submit: true, successfullLogin: true})
        navigate('/')
      } else {
        setState({...state, successfullLogin: false})     
      }      
    })
    .catch(error => setState({...state, successfullLogin: false}))
  }

  const handleElementChange = (element: any): void => {
    const newState = {
      ...state,
      [element.target.name]: element.target.value
    }
    setState(newState)
  }

  const renderLoginErrorSpan = () => {
    console.log(state)
    if(state.successfullLogin == false){
      return <a>Deu zica no login</a>
    }
  }

  return (     
    <>
      <HeaderContainer>
        <h2>Login</h2>
      </HeaderContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username" name='username' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name='password' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
          <LoginFormButtonsContainer>
            <LoginFormButtonsContainerRow1>
              <Button variant="secondary" type="submit">
                {"Login"}
              </Button>
              <Button variant="secondary" type="button"  onClick={navigateToUserRegister} >
                {"Register"}
              </Button>
              <Button variant="secondary" type="button"  onClick={navigateToForgotPassword} >
                {"Forgot password?"}
              </Button>
            </LoginFormButtonsContainerRow1>
          </LoginFormButtonsContainer>
      </Form>
      { renderLoginErrorSpan() }    
  </>
  );
}

export default LoginForm