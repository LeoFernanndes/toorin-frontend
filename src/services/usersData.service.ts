import axios from 'axios';
import { setupInterceptorsTo } from './axios-token-manager';
import { CreateBookFormState } from '../components/CreateBookForm';
import { Livro } from '../components/UpdateBookForm'
import { RegisterFormState } from "../components/RegisterForm";

const API_BASE_URL = 'http://localhost:8000/pessoas/users/'

// const api = setupInterceptorsTo(
//     axios.create()
//   );

class UsersService {
    createUser(registerPayload: RegisterFormState){
        return axios.post(API_BASE_URL, registerPayload)
    }

    // updateBook(bookId: Number, updateBookPayload: Livro){
    //     return api.put(API_BASE_URL + String(bookId) + '/', updateBookPayload)
    // }

}

export default new UsersService();