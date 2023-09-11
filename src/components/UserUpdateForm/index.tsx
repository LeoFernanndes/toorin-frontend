import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {Navigate, useNavigate} from 'react-router-dom'
import PeopleService from '../../services/peopleData.service';
import './styles.css'


export interface UserCreateUpdateFormProps {
  createProps?: {
    submitButtonText: string
  },
  updateProps?: {
    userId: number
    submitButtonText: string
  },
  action: "create" | "update"
}

export interface UserCreateUpdateData {
  id?: number,
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string
}

export interface UserCreateUpdateFormState {
  userData: UserCreateUpdateData,
  submit?: boolean,
  sumbitButtonText: string
}


function UserCreateUpdateForm(props: UserCreateUpdateFormProps){
  var initialState: UserCreateUpdateFormState = {
    userData: {
      "username": "",
      "email": "",
      "password": "",
      "first_name": "",
      "last_name": ""
    },
    sumbitButtonText: ""
  } 

  const [state, setState] = useState(initialState!); 
  const navigate = useNavigate();

  useEffect(() => { 
    if (props.action === "create"){
      initialState = {
        userData: {
          "username": "username create",
          "email": "email@email.com",
          "password": "password",
          "first_name": "first name",
          "last_name": "last name"
        },
        sumbitButtonText: props.createProps!.submitButtonText
      }
      setState(initialState)
    } else {
      PeopleService.userRetrieve(props.updateProps!.userId)
      .then(response => {
        const userInfo = response.data
        initialState = {
          userData: {
            "id": userInfo.id,
            "username": userInfo.username,
            "email": userInfo.email,
            "password": "",
            "first_name": userInfo.first_name,
            "last_name": userInfo.last_name
          },
          sumbitButtonText: props.updateProps!.submitButtonText 
        }
        setState(initialState)
      })
    };
  }, [])

  const handleCreate = async (): Promise<void> => {
    const userCreateUpdatePayload = JSON.parse(JSON.stringify(state.userData));
    PeopleService.userRegister(userCreateUpdatePayload)
      .then(response =>{ 
        setState({...state, submit: true})
        navigate('/login')
      })     
      .catch(error => {
        console.log(error)
      })    
  }

  async function handleUpdate(): Promise<void> {
    const userCreateUpdatePayload: UserCreateUpdateData = state.userData;
    PeopleService.userUpdate(userCreateUpdatePayload.id!, userCreateUpdatePayload)
      .then(response =>{ 
        setState({...state, submit: true})
        navigate('/')
      })    
      .catch(error => {
        console.log(error)
      })    
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if(props.action === "create"){
      handleCreate()
    } else if (props.action === "update") {
      handleUpdate()
    }
  }

  const handleElementChange = (element: any): void => {
    const newState: UserCreateUpdateFormState = {
      ...state,
      userData: {
        ...state.userData, [element.target.name]: element.target.value
      }
    }
    setState(newState)
  }

  return (      
    <Container className='form-container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control defaultValue={state.userData.username} type="text" name='username' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Email</Form.Label>
          <Form.Control defaultValue={state.userData.email} type="text" name='email' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name='password' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>First name</Form.Label>
          <Form.Control defaultValue={state.userData.first_name} type="text" name='first_name' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Last name</Form.Label>
          <Form.Control defaultValue={state.userData.last_name} type="text" name='last_name' onChange={element => {handleElementChange(element)}} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {state.sumbitButtonText}
        </Button>
        <Button variant="primary" type="button" onClick={() => navigate('/login')}>
          {"Back"}
        </Button>
      </Form>
    </Container>         
  );
};

export default UserCreateUpdateForm