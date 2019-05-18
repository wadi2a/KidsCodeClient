import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8008"
export default {
    login : function(email,password) {
        return axios.post(burl + '/user/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },
    addHistorique : function(user,score,gain,map) {
        return axios.post(burl + '/historique/add',{
            'user' :user,
            'score' : score,
            'gain' : gain,
            'map' : map,
        },{
            headers: headers
        })
    },
  /*  afficherHistorique :  function () {
         try {
            return  axios.get('/historique/all')
        } catch (error) {
            console.error(error)
        }
    },*/
    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },

    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    getUser : function() {
        return (localStorage.getItem('user'));
    },
    logout : function() {
        localStorage.clear();
    }
}
