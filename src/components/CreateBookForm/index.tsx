import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Navigate} from 'react-router-dom'
import BooksService from '../../services/booksData.service'
import { BookCreateFormContainer, BookCreateFormButtonsContainer,
  BookCreateFormButtonsFlex, HeaderContainer } from './styled';


type CreateBookFormProps = {
  nomeDoBotao: string;
}

export type CreateBookFormState = {
  "title": string,
  "isbm": string,
  "author": string,
  "publisher": string,
  "edition"?: number,
  "pages"?: number,
  "description": string,
  "submit"?: boolean
}

type ElementLabelName = {
  elemeentLabelname: 'titulo' | 'isbm' | 'autor' | 'editora' | 'edicao' | 'num_paginas' | 'descricao' | 'submit'
}

export class CreateBookForm extends React.Component<CreateBookFormProps, CreateBookFormState> {
  state: CreateBookFormState = {
    "title": "",
    "isbm": "",
    "author": "",
    "publisher": "",
    "edition": 0,
    "pages": 0,
    "description": "",
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
    console.log(newState)
  }

  render() {
    if (this.state.submit === true) {
      return <Navigate to='/' />;
    }
    return (  
      <>    
      <BookCreateFormContainer>
        <HeaderContainer>
          <h2>Adicionar livro</h2>
        </HeaderContainer>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" placeholder="título" name='title' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>ISBM</Form.Label>
            <Form.Control type="text" placeholder="isbm" name='isbm' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" placeholder="autor" name='author' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Editora</Form.Label>
            <Form.Control type="text" placeholder="editora" name='publisher' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Ediçao</Form.Label>
            <Form.Control type="text" placeholder="edição" name='edition' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Número de páginas</Form.Label>
            <Form.Control type="text" placeholder="número de páginas" name='pages' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" placeholder="descrição" name='description' onChange={element => {this.handleElementChange(element)}} />
          </Form.Group>
          <BookCreateFormButtonsContainer>
            <BookCreateFormButtonsFlex>
              <Button variant="secondary" type="submit">
                {"Criar"}
              </Button>
              <Button variant="secondary">
                {"Voltar"}
              </Button>
            </BookCreateFormButtonsFlex>
          </BookCreateFormButtonsContainer>
        </Form>
      </BookCreateFormContainer>     
      </>    
    );
  }
}
