const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users")
const github = new Github();
const ui = new UI(); 


eventListeners();


function eventListeners(){

    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Please fill the input")
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı bulunamadı")
            }else{
                ui.addSearchedUserToUi(username);
                Storage.addUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showReposInfo(response.repo);
            }
        })
        .catch(err => console.log(err))
    }

    ui.clearInputs();

    e.preventDefault();
}

function clearAllSearched(){
    
    Storage.clearAllUsersFromStorage();
    ui.clearAllUsersFromUi();

}

function getAllSearched(){

    let users = Storage.getAllSearchedFromStorage().reverse(); 

    let result = "";

    users.forEach(user => {
            result += `
            <li class="list-group-item">${user}</li>
            `
    });

    lastUsers.innerHTML = result;

}