import axios from 'axios';
import { setupInterceptorsTo } from './axios-token-manager';
import { UserRegisterFormState } from '../components/UserRegisterForm';
import { UserCreateUpdateData } from '../components/UserUpdateForm';


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/pessoas/users/`

const notAuthApi = axios.create()
const api = setupInterceptorsTo(
    axios.create()
  );

class PeopleService {
    userRegister(userRegisterPayload: UserRegisterFormState){
        return notAuthApi.post(API_BASE_URL, userRegisterPayload)
    }

    userRetrieve(userId: number){
        const RETRIEVE_URL = `${API_BASE_URL}${userId}/`
        return api.get(RETRIEVE_URL)
    }

    userUpdate(userId: number, user: UserCreateUpdateData){
        const PUT_URL = `${API_BASE_URL}${userId}/` 
        return api.put(PUT_URL, user)
    }
}

export default new PeopleService();