import axios from 'axios';
import  fs  from 'fs';

const API_URL = 'http://localhost:3000';
export class APIService{
    constructor(){
}
getAccounts(){
    const url = API_URL + '/api/accounts';
    return axios.get(url).then
    (response => response.data);
}
getAccountsByUsername(username){
    const url = API_URL + '/api/accounts?filter[where][username]=' + username
    return axios.get(url).then
    (response => response.data);
}
getAccountById(id,token){
    const url = API_URL + '/api/accounts/' + id + '?access_token=' + token
    return axios.get(url).then
    (response => response.data)
}
getLogin(token){
  const url = API_URL + '/api/logins?access_token='+token
  return axios.get(url).then(
    response => response.data
  )
}
addLogin(login,token){
  const url = API_URL + '/api/logins?access_token='+token
  return axios.post(url,login).then(
    response => response.data
  );
}
getRecipes(){
  const url = API_URL + '/api/recipes';
  return axios.get(url).then
  (response => response.data);
}
getRecipeByName(recipe){
  const url = API_URL + '/api/recipes?filter[where][name]=' + recipe
  return axios.get(url).then
  (response => response.data);
}
getRecipeByContributor(contributor){
  const url = API_URL + '/api/recipes?filter[where][contributor]=' + contributor
  return axios.get(url).then(
    response => response.data
  )
}
  getRecipeByType(type){
  const url = API_URL + '/api/recipes?filter[where][type]='+type
  return axios.get(url).then(
    response => response.data
  )
}
editAccount(account,token){
    const url = API_URL + '/api/accounts/' + account.id + '?access_token=' + token
    return axios.patch(url,account).then(
        response => response
    ).
     catch(
         error => error,

     )

}
editRecipe(recipe,token){
  const url = API_URL + '/api/recipes/' + recipe.id + '?access_token=' + token
  return axios.patch(url,recipe).then(
    response => response.data
  ).catch(
    error =>error
  )
}
deleteAccount(id,token){
    const url = API_URL + '/api/accounts/' + id + '?access_token=' + token
    return axios.delete(url).then(
        response => response
    ).catch(
        error => error
    )
}
deleteRecipe(id,token){
  const url =API_URL + '/api/recipes/' + id + '?acces_token=' + token
  return axios.delete(url).then(
    response => response
  )
}
login(account){

     const url = API_URL +'/api/accounts/login';
     return axios.post(url,account)
     .then(
         prom => prom.data,

     ).
     catch(
         error => error.statusCode,

     );

}
logout(token){

    const url = API_URL + 'api/accounts/logout?access_token=' + token
    return axios.post(url,token).then(
       response => response
    ).catch(
       error => error
    )
}

createAccount(account){
    const url = API_URL + '/api/accounts';
    return axios.post(url,account);
}

uploadImage(image,token,id,name){
   const url = API_URL + '/api/images/images/upload'
   console.log(image.name)
   const url2 = API_URL + '/api/images/rename'

   return new Promise(function(resolve,reject){

       var xhr = new XMLHttpRequest();
       var fd = new FormData();

       xhr.open("POST",url,true);
       xhr.onreadystatechange = function(){
           if(xhr.readyState == 4 && xhr.status == 200){
               resolve(JSON.parse(xhr.responseText));
           }
       };
       fd.append('file',image);
       xhr.send(fd);
       //axios.post(url2,image.name,name)
   }

   );
}
createRecipe(recipe,token){
    const url = API_URL + '/api/recipes?access_token=' + token;
    return axios.post(url,recipe);


}
getFormData(form){


}
}
