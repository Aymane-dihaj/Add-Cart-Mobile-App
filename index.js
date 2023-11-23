import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-cart-app-6b971-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings)

const inputFieldEl = document.getElementById("input-field")
const itemsEl = document.getElementById("items-list")
const addButtonEl = document.getElementById("add-button")

const database = getDatabase(app)

const itemsInDatabase = ref(database, "items")


addButtonEl.addEventListener("click", function()
{
    let inputValue = inputFieldEl.value
    if (inputValue != "")
        push(itemsInDatabase, inputValue)
    clearInputField()
})

onValue(itemsInDatabase, function(snapshot)
{
    if (snapshot.exists())
    {
        clearItemsList()
        let itemsArray = Object.entries(snapshot.val())
        for (let i = 0; i < itemsArray.length; i++)
        {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            addItemsTolist(currentItem)
        }
    }
    else 
    {
        itemsEl.innerHTML = "<p>No items here yet</p>"
    }
 
})


function clearInputField()
{
    inputFieldEl.value = ""
}

function clearItemsList()
{
    itemsEl.innerHTML = ""
}

function addItemsTolist(item)
{
    let itemID =  item[0]
    let itemVal = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemVal

    newEl.addEventListener("click", function()
    {
        let exactPath = ref(database, `/items/${itemID}`)
        // console.log(`${item[1]} removed from database`)
        remove(exactPath)
    })
    itemsEl.append(newEl)
}