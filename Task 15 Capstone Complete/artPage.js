let items = [];
let cart = [];
let cartCount = 0;
let total = 0;

// Initialisation of variables for later use in the JScript file


function item(name, image, descr, price, type) {
    this.name = name;
    this.image = image;
    this.descr = descr;
    this.price = price;
    this.type = type;

}

// Constructor used for the creation of item objects that will 
//later be stored in an array

let item1 = new item("White Shirt", "StoreImages/Shirts/Shirt.jpg", "White mens shirt - its a shirt", "20", "shirt")
let item2 = new item("White Shirt", "StoreImages/Shirts/Shirt.jpg", "White mens shirt - simple and stylish", "20", "shirt")
let item3 = new item("White Shirt", "StoreImages/Shirts/Shirt.jpg", "White mens shirt - simple and stylish", "20", "shirt")
let item4 = new item("Poster Print", "StoreImages/Prints/Poster.jpg", "Stylish artwork print in various sizes", "15", "poster")
let item5 = new item("Poster Print", "StoreImages/Prints/Poster.jpg", "Stylish artwork print in various sizes", "15", "poster")
let item6 = new item("Poster Print", "StoreImages/Prints/Poster.jpg", "Stylish artwork print in various sizes", "15", "poster")
let item7 = new item("Keychain", "StoreImages/Misc/Keychain.jpg", "Stylish keychain for your keys", "5", "misc")
let item8 = new item("Keychain", "StoreImages/Misc/Keychain.jpg", "Let the voices in", "5", "misc")
let item9 = new item("Keychain", "StoreImages/Misc/Keychain.jpg", "Stylish keychain for your keys", "5", "misc")
items.push(item1, item2, item3, item4, item5, item6, item7, item8, item9);

// Initialisation of item objects via the item constructor, as stated previously these
//items are stored in an items array, by doing this its easier to integrate new item objects 
//into the store as all the developer has to do is add valid information to create a new 
//item object and the add it to the items array

function displayItems() {
    let count = 0;
    // Initialisation of a counter used to keep track of how many objects are present within the item array
    for (i = 0; i < items.length; i++) {

        // for loop which runs for items array length


        if (i % 3 == 0) {

            // if else statement that checks whether i%3 has a remainder or not, if the condition is true then the if statement 
            //appends a new tr element along with additional elements creating an entirely new row 
            $("#StoreTable").append('<tr id = "tr' + count + '"></tr>')
            $("#tr" + count).append('<td><div>\
            <a  id = "img' + i + '" onclick = "itemInfo(this.id.charAt(3))"><img src="' + items[i].image + '" alt="" class="storeImg"></a></div>\
            <div style="background-color: rgb(49, 49, 49, 0.7);"><h4>' + items[i].name + " - " + items[i].price+ "$" + '</h4><button id = "btn' + i + '"  onclick = "addCart(this.id.charAt(3))">Add</button>\
            </div></td>')
            count++;

        } else if (i % 3 != 0) {
            //If the i%3 does have a remainder then the if else statement appends div and td elements only to the already existing 
            //tr element created previously. Additionally when an element is created and appended it is given its own unique id
            //using the count integer to help make these ID's unique
            $("#tr" + (count - 1)).append('<td><div>\
            <a  id = "img' + i + '" onclick = "itemInfo(this.id.charAt(3))"><img src="' + items[i].image + '" alt="" class="storeImg"></a></div>\
            <div style="background-color: rgb(49, 49, 49, 0.7);"><h4>' + items[i].name + " - " + items[i].price + "$" + '</h4><button id = "btn' + i + '"   onclick = "addCart(this.id.charAt(3))">Add</button>\
            </div></td>')

        }

    }

}

function itemInfo(clickedID) {
    $("#reviewDiv").show();
    $("body").css("overflow", "hidden");
    $("#itemName").text(items[clickedID].name)
    $("#itemPrice").text(items[clickedID].price)
    $("#itemDesc").text(items[clickedID].descr)
    $("#reviewImage").attr("src", items[clickedID].image);
    $(".buttonCart").attr("id", "btn" + clickedID);


}

//When a button is pressed this function unhides an already existing div that 
//overlays the rest of the page, basically creating a new page within an already existing
//page. Once the div is shown it is filled with the designated information which is found 
//by using the clickedid which corresponds with the specified item index in the items array 

function itemInfoHide() {
    $("#reviewDiv").hide();
    $("body").css("overflow-y", "scroll");
}

// When a button is pressed the div that covers the whole page is then hidden 

function addCart(clickedID) {
    cart.push(items[clickedID])
    cartCount++;
    total += Number(items[clickedID].price)
    x = JSON.stringify(cart);
    sessionStorage.setItem("sCart", x);
    sessionStorage.setItem("sTotal", total);
    alert("Your total is: " + total + "$")

}

// The cart array is used to store items that the user has chosen to purchase and 
//the total is used to keep track of the total price, this information is then stringified 
// and set into the JSON sessionStorage so that it may be used in the following cart page 
sTotal = 0;

sCart = [];

function displayCart() {
    sCart = JSON.parse(sessionStorage.getItem("sCart"))
    sTotal = JSON.parse(sessionStorage.getItem("sTotal"))

    //This function is called in the cart page after the store page. 
    //Two new variables are initialised so that they can store the existing information 
    //from the previous page by retrieving said information by parsing the sessionstorage data


    for (i = 0; i < sCart.length; i++) {
        if (sCart[i] == null) {

            // if statement used to check if an item in the sCart array is null, 
            //this can happen in the case of an item being removed from the cart 

        } else if (sCart != i) {

            // if the sCart item is not null then its information is appended to a div
            //so that it may be presented to the user 
            $("#cartDiv").append('<div style = " text-align: center; margin: auto" id = "cDiv' + i + '"><h1 class = "h1Cart" style = "display: inline-block; padding-right: 30px">' +
                sCart[i].name + " - " + sCart[i].price + "$" + '</h1> <button onclick = "removeItem(this.id), calculate()" id = "xBtn' + i + '">X</button></div>')
        }

    }

    $("#totalItem").text(sTotal + "$");
    $("#totalVat").text(sTotal * 15 / 100 + "$");
    calculate();

    // Execution of the calculate function so that the values displayed 
    //on the cart page ar constantly updated/refreshed

}

let cur = JSON.parse(sessionStorage.getItem('sCart'));
let num = JSON.parse(sessionStorage.getItem('sTotal'));

//Takes the sCart and sTotal values from sessionStorage and parses it 
//to two values


function removeItem(clickedID) {

    //A function that removes an item from the cart when the user presses a specific button 

    num = num - Number(cur[clickedID.charAt(4)].price);
    //Deducts the removed item price from the cost total in the cart 
    $("#cDiv" + clickedID.charAt(4)).remove();
    //Removes the removed items information from the cart div 
    cur[clickedID.charAt(4)] = null;
    //Sets the removed items information to null so that identifying a removed item 
    //is easier
    sessionStorage.setItem("sCart", JSON.stringify(cur));
    sessionStorage.setItem("sTotal", JSON.stringify(num));
    //Updates the sessionStorage with the new values of the removed items
    calculate();
    // Execution of the calculate function so that the values displayed 
    //on the cart page ar constantly updated/refreshed
}

function calculate() {

    let dispNum = num;

    //Another variable used to keep track of the total price of 
    //all the items in the cart


    switch ($('input[name=discount]:checked', '#form1').val()) {
        //Condition checks which radio button has been pressed an compares 
        //their assigned values
        case "1":
            $("#totalDiscount").text(0 + "$");
            break;

        case "2":
            $("#totalDiscount").text("-" + dispNum * 10 / 100 + "$");
            dispNum = dispNum - (dispNum * 10 / 100);

            break;

        case "3":
            $("#totalDiscount").text("-" + dispNum * 25 / 100 + "$");
            dispNum = dispNum - (dispNum * 25 / 100);

            break;

        case "4":
            $("#totalDiscount").text("-" + dispNum * 50 / 100 + "$");
            dispNum = dispNum - (dispNum * 50 / 100);

            break;
    }

    //Switch statement used to calculate 4 different discount conditions, depending on
    //which radio button in the page was pressed

    switch ($('input[name=delivery]:checked', '#form2').val()) {
        case "1":
            $("#totalDelivery").text(0 + "$");
            break;
        case "2":
            switch ($('input[name=deliveryType]:checked', '#form3').val()) {
                case "1":
                    dispNum = dispNum + 10;
                    $("#totalDelivery").text(10 + "$");
                    break;
                case "2":
                    dispNum = dispNum + 20;
                    $("#totalDelivery").text(20 + "$");
                    break;
            }
            break;

    }

    //Switch statement which checks what option has been selected on the page and adds an 
    //additional cost to the total price 
    $("#totalItem").text(num + "$");
    $("#total").text((dispNum + (num * 15 / 100)) + "$");
    $("#totalVat").text(num * 15 / 100 + "$");

    //Once all the calculations are complete, the new values are then appended to the specified 
    //html elements so that they are displayed to the user 



}



let refCode = "";

function genRefCode() {

    //A function that generates a random code consisting of numbers and letters

    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Creation of a string containing all the letters that are wanted in the random code,
    //in this case it will be the whole alphabet 
    for (var i = 0; i < 7; i++) {
        refCode += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        //A loop then runs 7 times and randomly selects 7 letters by using the math.random command 
        //which has a range of the length of the randomChars string 
    }

     //Same concepts apply with the random number generation >>>

    let randomNums = '1234567890';

    for (var i = 0; i < 4; i++) {
        refCode += randomNums.charAt(Math.floor(Math.random() * randomNums.length));
    }

   

}

function displayRefCode() {
    $("#reviewDiv2").show();
    $("#refCode").text(refCode)

    //Once the ref code has been generated it is then appended to the 
    //div so that is can be displayed to the user 

}

function hideRefCode() {
    $("#reviewDiv2").hide();

    //Hides the div that diplayes the ref code to the user 

}

function imgInteract() {
    $(".storeImg").hover(function () {
        $(this).css("opacity", "50%");
    }, function () {
        $(this).css("opacity", "100%");
    });

    $(".artworks").hover(function () {
        $(this).css("opacity", "50%");
    }, function () {
        $(this).css("opacity", "100%");
    });

    //When specified images are hovered over they have their 
    //opacites halved and once the mose is not hovering over them 
    //their opacity is se back to default

}