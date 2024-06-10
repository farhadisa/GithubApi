class Storage{

    static getAllSearchedFromStorage(){
        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"))
        }

        return users;
    }

    static addUserToStorage(username){

        const users = this.getAllSearchedFromStorage();

        if(users.indexOf(username) === -1){
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users))

    }

    static clearAllUsersFromStorage(){
        localStorage.removeItem("searched");
    }
}