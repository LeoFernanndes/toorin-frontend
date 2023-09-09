import axios from 'axios';


const API_ROOT = process.env.API_ROOT || 'http://localhost:8000'
const API_BASE_URL = `${API_ROOT}/token/`

class AuthService {
    login(username:string, password:string){
        return axios.post(API_BASE_URL, {username, password})
            .then(response => {
                if (response.status == 200){
                    localStorage.setItem("authApiResponse", JSON.stringify(response.data));
                    console.log(localStorage)
                    return response.data
                }
                
            })
            .catch(error => console.log(error))
    };

    logout(){
        localStorage.removeItem("authApiResponse")
    };

}

export default new AuthService();