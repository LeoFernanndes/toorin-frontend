import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import {Navigate} from 'react-router-dom'
import BooksService from '../../services/booksData.service'
import './styles.css'


type CreateBookFormProps = {
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

type ElementLabelName = {
  elemeentLabelname: 'titulo' | 'isbm' | 'autor' | 'editora' | 'edicao' | 'num_paginas' | 'descricao' | 'submit'
}

export class CreateBookForm extends React.Component<CreateBookFormProps, CreateBookFormState> {
  state: CreateBookFormState = {
    "titulo": "",
    "isbm": "",
    "autor": "",
    "editora": "",
    "edicao": 0,
    "num_paginas": 0,
    "descricao": "",
    "submit": false
  }

  handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const createBookPayload = JSON.parse(JSON.stringify(this.state));
    delete createBookPayload['submit']
    BooksService.createBook(createBookPayload)
      .then(response =>{ 
        console.log(response)
        this.setState({submit: true})
      })      
      .catch(error => {
        console.log(error)
      })    
  }

  handleElementChange = (element: any): void => {
    const newState = {
      ...this.state,
      [element.target.name]: element.target.value
    }
    this.setState(newState)
  }

  render() {
    if (this.state.submit === true) {
      return <Navigate to='/' />;
    }
    return (      
      
      <Container className='form-container'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" placeholder="título" name='titulo' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>ISBM</Form.Label>
            <Form.Control type="text" placeholder="isbm" onChange={element => {this.setState({isbm: element.currentTarget.value})}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" placeholder="autor" onChange={element => {this.setState({autor: element.currentTarget.value})}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Editora</Form.Label>
            <Form.Control type="text" placeholder="editora" onChange={element => {this.setState({editora: element.currentTarget.value})}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Ediçao</Form.Label>
            <Form.Control type="text" placeholder="edição" onChange={element => {this.setState({edicao: parseInt(element.currentTarget.value)})}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Número de páginas</Form.Label>
            <Form.Control type="text" placeholder="número de páginas" onChange={element => {this.setState({num_paginas: parseInt(element.currentTarget.value)})}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" placeholder="descrição" onChange={element => {this.setState({descricao: element.currentTarget.value})}} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {this.props.nomeDoBotao}
          </Button>
        </Form>
      </Container>         
    );
  }
}
