import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {Navigate, useNavigate} from 'react-router-dom'
import BooksService from '../../services/booksData.service'
import PeopleService from '../../services/peopleData.service';


import './styles.css'


type CreateBookFormProps = {
  nomeDoBotao: string;
}

type UserRegisterFormProps = {
  nomeDoBotao: string;
}

export type CreateBookFormState = {
  "titulo": string,
  "isbm": string,
  "autor": string,
  "editora": string,
  "edicao"?: number,
  "num_paginas"?: number,
  "descricao": string,
  "submit"?: boolean
}

export type UserRegisterFormState = {
  "username": string,
  "email": string,
  "password": string,
  "first_name": string,
  "last_name": string,
  "submit"?: boolean
}


// export class UserRegisterForm extends React.Component<UserRegisterFormProps, UserRegisterFormState> {
//   state: UserRegisterFormState = {
//     "username": "",
//     "email": "",
//     "password": "",
//     "first_name": "",
//     "last_name": "",
//     "submit": false
//   }

//   handleSubmit = async (event: React.FormEvent): Promise<void> => {
//     event.preventDefault();
//     const userRegisterPayload = JSON.parse(JSON.stringify(this.state));
//     delete userRegisterPayload['submit']
//     PeopleService.userRegister(userRegisterPayload)
//       .then(response =>{ 
//         console.log(response)
//         this.setState({submit: true})
//       })      
//       .catch(error => {
//         console.log(error)
//       })    
//   }

//   handleElementChange = (element: any): void => {
//     const newState = {
//       ...this.state,
//       [element.target.name]: element.target.value
//     }
//     this.setState(newState)
//   }

//   render() {
//     if (this.state.submit === true) {
//       return <Navigate to='/' />;
//     }
//     return (      
      
//       <Container className='form-container'>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicText">
//             <Form.Label>Username</Form.Label>
//             <Form.Control type="text" placeholder="username" name='username' onChange={element => {this.handleElementChange(element)}} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicText">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="text" placeholder="email" name='email' onChange={element => {this.handleElementChange(element)}} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicText">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="autor" name='password' onChange={element => {this.handleElementChange(element)}} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicText">
//             <Form.Label>First name</Form.Label>
//             <Form.Control type="text" placeholder="first name" name='first_name' onChange={element => {this.handleElementChange(element)}} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicText">
//             <Form.Label>Last name</Form.Label>
//             <Form.Control type="text" placeholder="last name" name='last_name' onChange={element => {this.handleElementChange(element)}} />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             {this.props.nomeDoBotao}
//           </Button>
//         </Form>
//       </Container>         
//     );
//   }
// }

function UserRegisterForm(){

  const [state, setState] = useState({
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "submit": false
  }); 

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const userRegisterPayload = JSON.parse(JSON.stringify(state));
    delete userRegisterPayload['submit']
    PeopleService.userRegister(userRegisterPayload)
      .then(response =>{ 
        console.log(response)
        setState({...state, submit: true})
      })
      .then(response =>{
        navigate('/login')
      })      
      .catch(error => {
        console.log(error)
      })    
  }

  const handleElementChange = (element: any): void => {
    const newState = {
      ...state,
      [element.target.name]: element.target.value
    }
    setState(newState)
  }

  // render(){
  //   if (this.state.submit === true) {
  //     return <Navigate to='/' />;
  //   }
    return (      
      
      <Container className='form-container'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name='username' onChange={element => {handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="email" name='email' onChange={element => {handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="autor" name='password' onChange={element => {handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="first name" name='first_name' onChange={element => {handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="last name" name='last_name' onChange={element => {handleElementChange(element)}} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {"Register"}
          </Button>
          <Button variant="primary" type="button" onClick={() => navigate('/login')}>
            {"Back"}
          </Button>
        </Form>
      </Container>         
    );
  };

  export default UserRegisterForm