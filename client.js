const ip = 'http://localhost:3000'
var logged = false
function verifyID(){
    let req = new XMLHttpRequest()
    //console.log('/verify/'+document.getElementById('user').value+'/'+document.getElementById('pass').value)
    req.open('GET',ip+'/verify/'+document.getElementById('user').value+'/'+document.getElementById('pass').value,true)
    req.onload = function(){
        if(req.response == 'true'){
            logged = true
            document.getElementById("loginLabel").innerHTML = "Logged In"
        }
    }
    req.send()
}
function createAccount(){
    let req = new XMLHttpRequest()
    req.open('POST',ip+'/createAccount/'+document.getElementById('user').value+'/'+document.getElementById('pass').value,true)
    req.onload = function(){
        document.getElementById("loginLabel").innerHTML = "Account Created"
    }
    req.send()
}
function addAccount(){
    if(logged){
        let req = new XMLHttpRequest()
        req.open('POST',ip+'/addAccount/'+document.getElementById('addName').value+'/'+document.getElementById('addUser').value+'/'+document.getElementById('addPass').value,true)
        req.onload = function(){
            document.getElementById("loginLabel").innerHTML = "Account Added"
        }
        req.send()
    }else{
        document.getElementById("loginLabel").innerHTML = "You are not logged in"
    }
}
function retrieveAccounts(){
    if(logged){
        let req = new XMLHttpRequest()
        req.open('GET',ip+'/retrieveAccounts',true)
        req.onload = function(){
            console.log(req.response)
            let data = JSON.parse(req.response)
            console.log(data)
            document.getElementById("loginTable").deleteTFoot()
            let tfoot = document.createElement("tfoot")
            for(let i=0; i<data.length; i++){
                let row = document.createElement("tr")
                let nameData = document.createElement("td")
                let nameDataText = document.createTextNode(data[i].accName)
                let userData = document.createElement("td")
                let userDataText = document.createTextNode(data[i].accUser)
                let passData = document.createElement("td")
                let passDataText = document.createTextNode(data[i].accPass)

                nameData.appendChild(nameDataText)
                userData.appendChild(userDataText)
                passData.appendChild(passDataText)
                row.appendChild(nameData)
                row.appendChild(userData)
                row.appendChild(passData)
                tfoot.appendChild(row)
            }
            document.getElementById("loginTable").appendChild(tfoot)
            // req.response.forEach(function(item){
            //     console.log(item)
            // })
        }
        req.send()
    }else{
        document.getElementById("loginLabel").innerHTML = "You are not logged in"
    }
}
function delAccount(){
    let req = new XMLHttpRequest()
    req.open('POST',ip+'/delAccount/'+document.getElementById("delName").value,true)
    console.log('/delAccount/'+document.getElementById("delName").value)
    req.onload = function(){
        document.getElementById("loginLabel").innerHTML = "Account Deleted"
    }
    req.send()
}
