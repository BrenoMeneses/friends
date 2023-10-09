let listaNomes = document.querySelector('#listaNomes')
let inputBusca = document.querySelector('#buscar')
let id = document.querySelector('span').innerHTML

let arrayID = []

// fetch para buscar os todos os usuarios exceto o usuario da conta =====================================================================================
fetch("http://localhost:8081/user/api/" + id).then(res => {
    return res.json()
}).then(data => {

    data.forEach(element => {
        arrayID.push({ firstname: element.firstname, id: element.id })

    })

}).catch((error) => { console.error(error) })

//mostrar os usuarios digitados no input ==========================================================================================================
inputBusca.addEventListener('input', (e) => {

    listaNomes.style.display = "block"

    listaNomes.innerHTML = ""

    if (inputBusca.value) {
        listaNomes.style.display = "block"
    } else {
        listaNomes.style.display = "none"
    }

    let users = arrayID.filter((element) => {
        return element.id == inputBusca.value || element.firstname.toLowerCase().includes(inputBusca.value.toLowerCase())
    })

    users.forEach(element => {
        getListaNomes(element.firstname, id, element.id)
    })

    if (users.length === 0) {
        listaNomes.innerHTML = "nenhum usuario encontrado"
    }
})

//fetch para pegar os convites enviados pelo usuario =================================================================================================
fetch("http://localhost:8081/friendRequest/api/getEnviado/" + id).then(res => {
    return res.json()
}).then(data => {

    data.forEach(element => {

        if(element.status === "pendente"){
            let convitesEnviados = document.querySelector('#listaConvitesEnviados')

            let li = document.createElement('li')
            li.textContent = `convite para ${element.firstname} - ${element.status}`
            convitesEnviados.appendChild(li)
        }


    })

}).catch((error) => { console.error(error) })

//fetch para pegar os convites recebidos pelo usuario =================================================================================================
fetch("http://localhost:8081/friendRequest/api/getRecebido/" + id).then(res => {
    return res.json()
}).then(data => {

    data.forEach(element => {
        
        if(element.status === "pendente"){
            let convitesEnviados = document.querySelector('#listaConvitesRecebidos')

            let li = document.createElement('li')
    
            let btnAceitar = document.createElement('a')
            btnAceitar.textContent = " aceitar "
            btnAceitar.href = `/friendship/createFriendship/${element.senderId}/${id}/aceito`
    
            let btnRecusar = document.createElement('a')
            btnRecusar.textContent = " recusar "
            btnRecusar.href = `/friendship/createFriendship/${element.senderId}/${id}/recusado`
    
            li.textContent = `convite de ${element.firstname} - ${element.status} `
            li.appendChild(btnAceitar)
            li.appendChild(btnRecusar)
    
            convitesEnviados.appendChild(li)
        }

    })

}).catch((error) => { console.error(error) })

//fetch para pegar as amizades aceitas do usuário =================================================================================================
fetch("http://localhost:8081/friendship/api/getFriendship/" + id).then(res => {
    return res.json()
}).then(data => {

    data.forEach(element => {

        let convitesEnviados = document.querySelector('#listaAmigos')

        let li = document.createElement('li')

        li.textContent = element.firstname + " " + element.lastname

        convitesEnviados.appendChild(li)

    })

}).catch((error) => { console.error(error) })

function getListaNomes(nome, id1, id2) {
    let div = document.createElement('div')
    div.textContent = nome + "  "
    div.classList.add("nomeLI")

    let a = document.createElement('a')
    a.classList.add("linkAdicionar")
    a.textContent = "adicionar"
    a.href = "/friendRequest/" + id1 + "/" + id2

    div.appendChild(a)
    listaNomes.appendChild(div)
}
