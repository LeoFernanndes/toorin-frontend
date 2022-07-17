import axios from 'axios';

const API_URL = 'http://192.168.33.10:8000/token/'
class AuthService {
    login(username:string, password:string){
        return axios.post(API_URL, {username, password})
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