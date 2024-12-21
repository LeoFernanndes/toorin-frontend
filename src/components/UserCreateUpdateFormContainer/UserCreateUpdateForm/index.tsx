import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import PeopleService from '../../../services/peopleData.service';
import { UserCreateUpdateFormButtonsFlex, UserCreateUpdateFormButtonsContainer,
  UserCreateUpdateFormContainer, HeaderContainer } from './styled';


// TODO: Update user must have special routes for email and password
// TODO: Check back button on update layout returning to login event havin a valid session


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
  sumbitButtonText: string,
  formTitle: string
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
    sumbitButtonText: "",
    formTitle: ""
  } 

  const [state, setState] = useState(initialState!); 
  const navigate = useNavigate();

  useEffect(() => { 
    if (props.action === "create"){
      initialState = {
        userData: {
          "username": "",
          "email": "",
          "password": "",
          "first_name": "",
          "last_name": ""
        },
        sumbitButtonText: props.createProps!.submitButtonText,
        formTitle: "Register"
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
          sumbitButtonText: props.updateProps!.submitButtonText,
          formTitle: "Update user"
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

  if(props.action == 'create'){
    return (      
      <UserCreateUpdateFormContainer>
          <HeaderContainer>
            <h2>{state.formTitle}</h2>
          </HeaderContainer>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder={'username'} type="text" name='username' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder={'email@domain.com'} type="text" name='email' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" name='password' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>First name</Form.Label>
              <Form.Control placeholder={'first name'} type="text" name='first_name' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Last name</Form.Label>
              <Form.Control placeholder={'last name'} type="text" name='last_name' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <UserCreateUpdateFormButtonsContainer>
              <UserCreateUpdateFormButtonsFlex>
                <Button variant="secondary" type="submit">
                  {state.sumbitButtonText}
                </Button>
                <Button variant="secondary" type="button" onClick={() => navigate('/login')}>
                  {"Back"}
                </Button>
              </UserCreateUpdateFormButtonsFlex>
            </UserCreateUpdateFormButtonsContainer>
          </Form>
      </UserCreateUpdateFormContainer>     
    );
  } else {
    return (      
      <UserCreateUpdateFormContainer>
          <HeaderContainer>
            <h2>{state.formTitle}</h2>
          </HeaderContainer>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>First name</Form.Label>
              <Form.Control value={state.userData.first_name} type="text" name='first_name' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Last name</Form.Label>
              <Form.Control value={state.userData.last_name} type="text" name='last_name' onChange={element => {handleElementChange(element)}} />
            </Form.Group>
            <UserCreateUpdateFormButtonsContainer>
              <UserCreateUpdateFormButtonsFlex>
                <Button variant="secondary" type="submit">
                  {state.sumbitButtonText}
                </Button>
                <Button variant="secondary" type="button" onClick={() => navigate('/login')}>
                  {"Back"}
                </Button>
              </UserCreateUpdateFormButtonsFlex>
            </UserCreateUpdateFormButtonsContainer>
          </Form>
      </UserCreateUpdateFormContainer>     
    );
  }
}  

export default UserCreateUpdateForm