import React from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { Navigate } from "react-router-dom";
import { UpdateBookForm } from '../UpdateBookForm';
import BooksService from '../../services/booksData.service'
import './BooksList.css'


type Livro = {
  "id"?: number,
  "title": string,
  "isbm": string,
  "author": string,
  "publisher": string,
  "edition"?: number,
  "pages"?: number,
  "description": string
}

type Props = {}

type State = {
  livros: Livro[]
  action: 'list' | 'update',
  bookId: number | undefined,
  isLoggedIn: boolean

}

export class BooksList extends React.Component<Props, State> {      
  state: State = {
    livros: [],
    action: 'list',
    bookId: 0,
    isLoggedIn: false
  }

  backToList = () => {
    this.setState({action: 'list'})
  }

  async componentDidUpdate(prevPros: Props, prevState: State){
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)){
      this.componentDidMount()
      console.log(JSON.stringify(this.state.livros) !== JSON.stringify(prevState.livros))
      console.log('componentDidUpdate')
    }
  }

  async componentDidMount() {   
    BooksService.listBooks()
    .then(response => {
      this.setState({livros: response.data})
    })
    .catch(error => console.log(error))
  }

  async deleteBook(bookId: any): Promise<void> {
    BooksService.deleteBook(bookId)
    .then(response => {
      BooksService.listBooks()
      .then(response => {
      this.setState({livros: response.data})
    })
    })
    .catch(error => console.log(error))
  }
  
  render() {
    if (!localStorage.authApiResponse){
      return <Navigate to='/login' />
    }
    if (this.state.action === "list"){
      return(
        <Container className="list-container">
          <h2 className='header'>Lista de livros cadastrados</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr key="header">
              <th>#</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Edição</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
          { 
            this.state.livros.map((livro) => {
              return(      
                  <tr key={livro.id}>
                    <td>{livro.id}</td>
                    <td>{livro.title}</td>
                    <td>{livro.author}</td>
                    <td>{livro.edition}</td>
                    <td>
                      <div className='buttons-container'>
                        <button className="list-button" onClick={() => { this.setState({action: 'update', bookId: livro.id})}}>Update</button>
                        <button className='list-button' onClick={() => { this.deleteBook(livro.id) }}>Delete</button>
                      </div>
                    </td>
                  </tr>          
                )
              })    
            }
          </tbody>          
        </Table>
        </Container>        
      )
    } else {
      return (
              <UpdateBookForm nomeDoBotao="update" bookId={this.state.bookId} backToList={this.backToList}/>
        )
    }
  }
}
