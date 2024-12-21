import axios from 'axios';
import { setupInterceptorsTo } from './axios-token-manager';
import { CreateBookFormState } from '../components/CreateBookForm';
import { Livro } from '../components/UpdateBookForm'


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/books/`

const api = setupInterceptorsTo(
    axios.create()
  );

class BooksService {
    createBook(createBookPayload: CreateBookFormState){
        return api.post(API_BASE_URL, createBookPayload)
    }

    listBooks(){
        return api.get(API_BASE_URL)
    }

    retrieveBook(bookId: Number){
        return api.get(API_BASE_URL + String(bookId))
    }

    updateBook(bookId: Number, updateBookPayload: Livro){
        return api.put(API_BASE_URL + String(bookId) + '/', updateBookPayload)
    }

    deleteBook(bookId: Number){
        return api.delete(API_BASE_URL + String(bookId))
    }
}

export default new BooksService();