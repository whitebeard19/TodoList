import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://to-do-list-da69f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todoListInDB = ref(database, "todoList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const todoListEl = document.getElementById("todo-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(todoListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(todoListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        cleartodoListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTotodoListEl(currentItem)
        }    
    } else {
        todoListEl.innerHTML = "No items here... yet"
    }
})

function cleartodoListEl() {
    todoListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTotodoListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `todoList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    todoListEl.append(newEl)
}