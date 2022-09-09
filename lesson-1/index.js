
let listacrud = [1,2,3,45,5,6]


//ejemplo   1
const mostrarLista=(lista)=>{
    if(lista == null || lista.length == 0){
        console.log("No hay elementos en la lista");
    }else{
        for (let i = 0; i < lista.length; i++) {
            console.log(lista[i]);
        }
    }
}
mostrarLista()




//ejemplo 2
const lista = [];
(function (){
    
    if(lista == null || lista.length == 0){
        console.log("No hay elementos en la lista");
    }else{
        for (let i = 0; i < lista.length; i++) {
            console.log("se ve "+lista[i]);
        }
    }
}(lista))