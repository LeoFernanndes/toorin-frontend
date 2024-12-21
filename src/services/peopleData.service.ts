import axios from 'axios';
import { setupInterceptorsTo } from './axios-token-manager';
import { UserCreateUpdateData } from '../components/UserCreateUpdateFormContainer/UserCreateUpdateForm';


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/people/users/`

const notAuthApi = axios.create()
const api = setupInterceptorsTo(
    axios.create()
  );

class PeopleService {
    userRegister(userRegisterPayload: UserCreateUpdateData){
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