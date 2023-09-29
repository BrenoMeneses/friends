let listaNomes = document.querySelector('#listaNomes')
let inputBusca = document.querySelector('#buscar')
let id = document.querySelector('span').innerHTML

let arrayID = []

let endpoint = "http://localhost:8081/api/"+id

fetch(endpoint).then(res=>{
    return res.json()
}).then(data=>{

        data.forEach(element => {

            arrayID.push({firstname: element.firstname, id: element.id})

        })

    }).catch((error) => {console.error(error)})

inputBusca.addEventListener('input', (e)=>{

    listaNomes.style.display = "block"

    listaNomes.innerHTML = ""

    if(inputBusca.value){
        listaNomes.style.display = "block"
    }else{
        listaNomes.style.display = "none"
    }

    let users = arrayID.filter((element)=>{
        console.log(element.id, element.firstname)      
        return element.id == inputBusca.value || element.firstname.toLowerCase().includes(inputBusca.value.toLowerCase())
    })

    users.forEach(element => {
        getListaNomes(element.firstname, id, element.id)
    })

    if(users.length === 0){
        listaNomes.innerHTML = "nenhum usuario encontrado"
    }
})

function getListaNomes(nome, id1, id2){
    let div = document.createElement('div')
    div.textContent = nome+"  "
    div.classList.add("nomeLI")

    let a = document.createElement('a')
    a.classList.add("linkAdicionar")
    a.textContent = "adicionar"
    a.href = "/friendRequest/"+id1+"/"+id2
        
    div.appendChild(a)
    listaNomes.appendChild(div)
}
