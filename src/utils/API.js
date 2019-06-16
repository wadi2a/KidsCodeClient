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
    profil : function(email, password,Age, Nom, Sex, Prénom){
        return axios.post(burl + '/user/Profil',{
            'email' : email,
            'password' : password,
            'sex' : Sex,
            'age' : Age,
            'nom' : Nom,
            'prénom' : Prénom
        },{
             headers: headers
        })
},
    addHistorique : function(user,score,gain,map) {

        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        if (hours==0) hours ="00";

        let min = new Date().getMinutes(); //Current Minutes
        let sec = new Date().getSeconds(); //Current Seconds
        if (date==0) date ="00";
        if (year==0) year ="00";
        if (sec==0) sec ="00"; if (hours==0) hours ="00";
        if (min==0) min ="00";
        if (month<10) month ="0"+month;

        let dateF = year+"-"+month+"-"+date+"T"+hours+":"+min+":"+sec;
        return axios.post(burl + '/historique/add',{
            'user' :user,
            'score' : score,
            'gain' : gain,
            'map' : map,
            'date' : dateF,
        },{
            headers: headers
        })
    },
   getAllHistorique : async function () {
       return await axios.get(burl + '/historique/all')

   },
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
