document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
gameState = {
    "door2locked": true,
    "inventory": [
    ]
}

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if(e.target.id !== "mainCharacter") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {
        
        case "door1":
            mainCharacter.style.backgroundColor = "#FFFF00";
            door1.style.opacity = 0.5;
            sign.style.opacity = 1;
            if(document.getElementById("key1") !== null){
                console.log('Found key!');
                document.getElementById("key1").remove();
                changeInventory('key', 'add');
            }
            
            break;
        case "door2":
            if(gameState.door2locked == true) {
                // check if we have key
                if(document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('key', 'delete');
                    console.log('Door unlocked!');

                } else {
                    //no -> alert 'door locked'
                    alert("Door is locked!");
                }
            } else {
                console.log('enter building');
            }
            
            break;

        case "sign":
            mainCharacter.style.backgroundColor = "#FFFF00";
            sign.style.opacity = 0.5;
            door1.style.opacity = 1;
            break;

        default:
            //explode
            mainCharacter.style.backgroundColor = "#1286a7";
            door1.style.opacity = 1;
            sign.style.opacity = 1;
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if(itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return 
    }

    switch(action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function(item, index){
                if(item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList){
    inventoryList.innerHTML = '';
    inventory.forEach(function(item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

