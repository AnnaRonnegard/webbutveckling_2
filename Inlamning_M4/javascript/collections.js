function rensa()
{
    document.getElementById("utskrift").innerHTML="";
}

function submitForm() 
{
    const angivetFält = document.forms[0][4].value; //Läser in fältnummer. 0'an indikerar att det är 1'a form och 4'an det det är det 5'e fältet.
    let index = angivetFält-1; //Skapar index.
    if (index < 0 || index > 3 ) { //Vi vill bara använda de 4 första fälten.
        alert("Felaktigt nummer!");
        return;
    }
    const värdeFrånSöktForm = document.forms[0][index].value; //Läser från angivet fält.
    document.getElementById("utskrift").innerHTML="Nu har du skickat:<br>" + värdeFrånSöktForm; //Skriver ut.
}

function submitDivar() 
{
    const allaDivar = document.querySelectorAll("#text div"); //Läser in alla aktuella divar i en lista.
    let sträng = "";
    let textNodes = []; //Skapar en lista, textNode, som kommer att innehålla alla text-noder.

    for(let i = 0; i < allaDivar.length; i++) //Loopar igenom divarna.
    {
        for(let j = 0; j < allaDivar[i].childNodes.length; j++) //Loopar igenom deras noder (childNodes returnerar en nod-lista).
        {
           if(allaDivar[i].childNodes[j].nodeType == Node.TEXT_NODE) //Kollar om text-nod.
            {
                textNodes.push(allaDivar[i].childNodes[j]); //Lägger in noden i textNodes listan.
            }
        }
    }

    for (let a = 0 ; a < textNodes.length; a++) //Loopar igenom textNode listan.
    {
        sträng += (a+1) + ": " + textNodes[a].nodeValue +"<br>"; //Skriver in texten med numrering i en sträng.
    }
    document.getElementById("utskrift").innerHTML="Texten i divarna är:<br>" + sträng;
}

function submitAllEntries() 
{
    const allNodes = document.getElementById("nodes").childNodes; //Letar rätt på alla aktuella noder.
    let sträng = "";
    for (let x of allNodes.entries()) //Entries är en key/value par från en nod-lista.
    {
        sträng += x[0] + " " + x[1].nodeName + "<br>"; //x[0] är nyckel och x[1] värde. (nodeName på värdet ger en snyggare utskrift)
    }
    document.getElementById("utskrift").innerHTML=sträng;
}

function submitAllKeys() 
{
    const AllKeys = document.getElementById("nodes").childNodes.keys(); //Letar rätt på alla aktuella noders nyklar.
    let sträng = "";
    for (let x of AllKeys) //Loopar igenom.
        {
        sträng += x + "<br>"; //Läser in nyklarna i en sträng.
    }
    document.getElementById("utskrift").innerHTML=sträng;
}

function submitAllValues() 
{
    const allElements = document.getElementById("nodes").children; //Skapar en lista med aktuella element (children returnerar alla element).
    let sträng = "";
    for (let x of allElements) //Loopar igenom.
        {
        sträng += x.innerHTML + "<br>"; //Läser in den text elementen innehåller i en sträng.
    }
    document.getElementById("utskrift").innerHTML=sträng;
}

function submitParagraphValues() 
{
    const allaParagrafer = document.querySelectorAll("#nodes p"); //Söker rätt på alla aktuella paragrafer.

    let sträng = "";
    let textLista = []; //Skapar en lista, textLista, som kommer att innehålla alla noders text.

    for (i = 0; i < allaParagrafer.length; i++) //Loopar igenom. 
    {
        sträng += allaParagrafer[i].innerHTML + "<br>"; //Lägger in texten i en sträng.
    }
    document.getElementById("utskrift").innerHTML= sträng;
}

function  submitHeader4Value() //
{
    const aktuellH4 = document.querySelector("#nodes h4"); //Söker rätt på aktuell h4-rubrik, det finns bara en.
    document.getElementById("utskrift").innerHTML=aktuellH4.innerHTML;
}