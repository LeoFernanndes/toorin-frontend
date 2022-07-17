import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {useNavigate, Navigate} from 'react-router-dom'
import { SyntheticEvent } from 'react'
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

export class LoginForm extends React.Component<CreateBookFormProps, loginFormState> {
  state: loginFormState = {
    "username": "",
    "password": "",
    "submit": false
  }

  // handleSubmit = async (event: React.FormEvent): Promise<void> => {
  //   event.preventDefault();
  //   const api = axios.create({
  //     baseURL: 'http://192.168.33.10:8000'
  //   })
  //   const loginPayload = JSON.parse(JSON.stringify(this.state));
  //   delete loginPayload['submit']
  //   delete loginPayload['sucessfullLogin']
  //   console.log(loginPayload)
  //   const response = await api.post('/token/', loginPayload)
  //     .then(response =>{ 
  //       console.log(response)
  //       localStorage.setItem('bearerToken', response.data.access)
  //       localStorage.setItem('refreshToken', response.data.refresh)
  //       this.setState({submit: true, successfullLogin: true})
  //     })      
  //     .catch(error => {
  //       console.log(error.response.data)
  //       this.setState({successfullLogin: false})
  //     })    
  // }

  handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    AuthService.login(this.state.username, this.state.password)
    .then(response => {
      if (response?.access){
        this.setState({submit: true, successfullLogin: true})
      } else {
        this.setState({successfullLogin: false})     
      }      
    })
    .catch(error => this.setState({successfullLogin: false}))
  }

  handleElementChange = (element: any): void => {
    const newState = {
      ...this.state,
      [element.target.name]: element.target.value
    }
    this.setState(newState)
  }

  render() {
    console.log('dentro do render')
    console.log(JSON.stringify(this.state))
    if (this.state.submit === true) {      
      return <Navigate to='/' />;
    }

    const renderLoginErrorSpan = () => {
      console.log(this.state)
      if(this.state.successfullLogin == false){
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" name='password' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {this.props.nomeDoBotao}
          </Button>
        </Form>
        { renderLoginErrorSpan() }     
      </Container>         
    );
  }
}