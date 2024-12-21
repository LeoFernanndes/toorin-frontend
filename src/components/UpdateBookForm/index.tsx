import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BooksService from '../../services/booksData.service';
import { BookUpdateFormContainer, BookUpdateFormButtonsContainer, BookUpdateFormButtonsFlex } from './styled';


// TODO: Check query parameter on the url after performing update


export type Livro = {
  "id"?: number,
  "title": string,
  "isbm": string,
  "author": string,
  "publisher": string,
  "edition"?: number,
  "pages"?: number,
  "description": string
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
    "title": '',
    "isbm": '',
    "author": '',
    "publisher": '',
    "edition": 0,
    "pages": 0,
    "description": ''
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
        [element.target.name]: element.target.value
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
      <BookUpdateFormContainer>
        <h2 className='header'>Atualizar livro cadastrado</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" name="title" onChange={element => {this.handleElementChange(element)}} value={this.state.livro.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>ISBM</Form.Label>
            <Form.Control type="text" name="isbm" onChange={element => {this.handleElementChange(element)}} value={this.state.livro.isbm}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text"  name="author" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.author}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Editora</Form.Label>
            <Form.Control type="text"  name="publisher" onChange={element =>{{this.handleElementChange(element)}}} value={this.state.livro.publisher}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Ediçao</Form.Label>
            <Form.Control type="text" name="edition" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.edition}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Número de páginas</Form.Label>
            <Form.Control type="text" name="pages" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.pages}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" name="description" onChange={element => {{this.handleElementChange(element)}}} value={this.state.livro.description}/>
          </Form.Group>
          <BookUpdateFormButtonsContainer>
            <BookUpdateFormButtonsFlex>
            <Button className='button' variant="secondary" type="submit">
              {this.props.nomeDoBotao}
            </Button>
            <Button className='button' variant="secondary" type="submit" onClick={this.props.backToList}>
              Back
            </Button>
            </BookUpdateFormButtonsFlex>
          </BookUpdateFormButtonsContainer>          
        </Form>
      </BookUpdateFormContainer>         
    );
  }
}