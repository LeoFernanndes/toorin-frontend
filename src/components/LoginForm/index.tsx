import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {useNavigate, Navigate} from 'react-router-dom'
import AuthService from '../../services/auth.service'; // import com @


import './styles.css'


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
    <Container className='form-container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username" name='username' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name='password' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {"Login"}
        </Button>
        <Button variant="secondary" type="button"  onClick={navigateToUserRegister} >
          {"Register"}
        </Button>
      </Form>
      { renderLoginErrorSpan() }    
    </Container>         
  );
}

export default LoginForm