import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import BooksService from '../../services/booksData.service';
import './styles.css';


export type Livro = {
  "id"?: number,
  "titulo": string,
  "isbm": string,
  "autor": string,
  "editora": string,
  "edicao"?: number,
  "num_paginas"?: number,
  "descricao": string
}

type Props = {
  nomeDoBotao: string,
  bookId: number | undefined // dar uma olhada nesse undefined ja que em nesse componente sempre haverá um id
  backToList: () => void
}

type State = {
  livro: Livro
}

export class UpdateBookForm extends React.Component<Props, State> {
  state: State = {
   livro: {
    "id": 0,
    "titulo": '',
    "isbm": '',
    "autor": '',
    "editora": '',
    "edicao": 0,
    "num_paginas": 0,
    "descricao": ''
   }
  }

  async componentDidMount() {
    const bookId = this.props.bookId || 0
    BooksService.retrieveBook(bookId)
      .then(response =>{ 
        let retrievedBook: Livro = response.data
        this.setState({livro: {...retrievedBook}})
      })
      .catch(error => console.log(error))
  
  }

  handleElementChange = (element: any): void => {
    const value = element.currentTarget.value
    this.setState((prevState)  => ({
      ...prevState,
      livro: {
        ...prevState.livro,
        [element.target.name]: value
      }
    }))
  }

  handleSubmit = async (event: React.FormEvent): Promise<void> => {
    const bookId = this.props.bookId || 0
    let updatedBookPayload = this.state.livro
    delete updatedBookPayload['id']
    console.log(updatedBookPayload)
    BooksService.updateBook(bookId, updatedBookPayload)
      .then(response =>{ 
        let retrievedBook: Livro = response.data
        this.setState({livro: {...retrievedBook}})
        this.props.backToList()
      })
      .catch(error => {
        console.log(error.response.data)
        console.log(this.state)
      })
    
  }

  render() {
    return (      
      <Container className='form-container'>
        <h1 className='header'>Atualizar livro cadastrado</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" name="titulo" onChange={element => {this.handleElementChange(element)}} value={this.state.livro.titulo} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>ISBM</Form.Label>
            <Form.Control type="text" name="isbm" onChange={element => {this.handleElementChange(element)}} value={this.state.livro.isbm}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text"  name="autor" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.autor}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Editora</Form.Label>
            <Form.Control type="text"  name="editora" onChange={element =>{{this.handleElementChange(element)}}} value={this.state.livro.editora}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Ediçao</Form.Label>
            <Form.Control type="text" name="edicao" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.edicao}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Número de páginas</Form.Label>
            <Form.Control type="text" name="num_paginas" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.num_paginas}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" name="descricao" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.descricao}/>
          </Form.Group>
          <div className='buttons-group'>
            <Button className='button' variant="primary" type="submit">
              {this.props.nomeDoBotao}
            </Button>
            <Button className='button' variant="primary" type="submit" onClick={this.props.backToList}>
              Back
            </Button>
          </div>          
        </Form>
      </Container>         
    );
  }
}