import axios from 'axios';
import { setupInterceptorsTo } from './axios-token-manager';
import { UserRegisterFormState } from '../components/UserRegisterForm';


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/pessoas/users/`

const api = axios.create()

class PeopleService {
    userRegister(userRegisterPayload: UserRegisterFormState){
        return api.post(API_BASE_URL, userRegisterPayload)
    }
}

export default new PeopleService();