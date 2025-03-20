//Array used to define messages (which will change) within the class hero-message.
const messages = [
    "Being in the CCL means",
    "Connect with the largest network of entrepreneurs in Peru."  
];
let index = 0;

//JavaScript DOM Manipulation:
//Function used to change the messages from the "messages" array.
function changeMessage() {
    index = (index + 1) % messages.length;
    document.getElementById("heroMessage").textContent = messages[index];
}
setInterval(changeMessage, 4000);