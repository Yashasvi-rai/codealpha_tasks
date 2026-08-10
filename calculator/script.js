const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const themeBtn = document.getElementById("themeBtn");

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    try{

        let expression = display.value;
        let result = eval(expression);

        historyList.innerHTML +=
        `<li>${expression} = <b>${result}</b></li>`;

        display.value = result;

    }catch{

        display.value="Error";

    }

}

document.addEventListener("keydown",function(e){

    let key=e.key;

    if(!isNaN(key)||"+-*/.%".includes(key))
        appendValue(key);

    else if(key==="Enter"){
        e.preventDefault();
        calculate();
    }

    else if(key==="Backspace")
        deleteLast();

    else if(key==="Escape")
        clearDisplay();

});

themeBtn.onclick=function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light"))
        themeBtn.innerHTML="☀";
    else
        themeBtn.innerHTML="🌙";

};