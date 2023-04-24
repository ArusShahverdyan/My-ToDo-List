const apiUrl = "http://localhost:3001";

export default class TaskApi{
    get(){

    }
    post(task){
        fetch(apiUrl +"/task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(task),
          })
            .then((result) => result.json())
         };

    
    put(){

    }
    delete(){

    }
}


//const api = new TaskApi()