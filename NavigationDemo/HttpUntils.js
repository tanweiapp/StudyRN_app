/**
 * Created by maikegeleidi on 20/11/18.
 */
export  default class HttpUntils {
    static  get(url){
        return new Promise((resolve,reject) =>{
            fetch(url)
                .then(response=>response.json())
                .then(result => {
                    resolver(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    static  post(url,data){
        return new Promise((resolve,reject) =>{
            fetch(url,{
                method:'POST',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(result => {
                    resolver(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
}