import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {useNavigate, Navigate} from 'react-router-dom'
import { SyntheticEvent } from 'react'
import AuthService from '../../services/auth.service'; // import com @
import UsersDataService from "../../services/usersData.service";

import './styles.css'


type CreateBookFormProps = {
  nomeDoBotao: string;
}

export type RegisterFormState = {
  "username": string,
  "email": string,
  "password": string,
  "firstName": string,
  "lastName": string,
  "submit": boolean,
  "navigateHome": boolean,
  "successfulRegister"?: boolean
}

type ElementLabelName = {
  elemeentLabelname: 'username' | 'password'
}

export class RegisterForm extends React.Component<CreateBookFormProps, RegisterFormState> {
  state: RegisterFormState = {
    "username": "",
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "submit": false,
    "navigateHome": false
  }

  handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const registerPayload = JSON.parse(JSON.stringify(this.state));
    delete registerPayload['submit']
    UsersDataService.createUser(registerPayload)
    .then(response => {
      console.log(JSON.stringify(response))
      if (response?.status === 201){
        this.setState({submit: true, successfulRegister: true})
      } else {
        this.setState({successfulRegister: false})
      }      
    })
    .catch(error => {
      this.setState({successfulRegister: false})
      console.log(JSON.stringify(error.response))
    })
  }

  handleElementChange = (element: any): void => {
    const newState = {
      ...this.state,
      [element.target.name]: element.target.value
    }
    this.setState(newState)
  }

  navigateHome = () => {
    this.setState({navigateHome: true})
  }

  render() {
    console.log('dentro do render')
    console.log(JSON.stringify(this.state))
    if (this.state.submit === true) {      
      return <Navigate to='/' />;
    } else {
      if (this.state.navigateHome === true){
        return <Navigate to={'/'} />
      }
    }

    const renderLoginErrorSpan = () => {
      console.log(this.state)
      if(this.state.successfulRegister == false){
        return <a>Deu zica no login</a>
      }
    }

    return (     
      <Container className='form-container'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name='username' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>email</Form.Label>
            <Form.Control type="text" placeholder="email" name='email' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" name='password' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="first_name" name='first_name' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="last_name" name='last_name' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="primary" onClick={this.navigateHome}>
            Back
          </Button>
        </Form>
        { renderLoginErrorSpan() }     
      </Container>         
    );
  }
}