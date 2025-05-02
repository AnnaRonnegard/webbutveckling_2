function saveFile() 
{
        
    //Används för att interagera mad data i varje element i formuläret.
    const name = document.getElementById('txtName');
    const email = document.getElementById('txtEmail');
    const city = document.getElementById('selCity');
    const msg = document.getElementById('msg');
        
    //Nedanstående kontroll funktioner är implementerade med en boolean som return. True om korrekt ifyllt. De kan då användas som vilkor för att skriva in i filen. Funktionerna behöver inga input-parameterar, då email, name etc finns i scoopet ovan.
    //Rutan skakar bara när klassen shakeInField läggs till, skaket sker en gång. För att skaket av ruta ska fungera vid 2 felskrivningar i rad måste den tas bort för att sedan läggas till igen. Klassen shakeInField finns i contact.css.
    //(Med "trimning" menar jag att blanktecken tas bort före och efter texten med .trim() .)
    function validateEmail() 
    {
        email.classList.remove("shakeInField"); //Tar bort klassen shakeInField (om den finns).
        email.offsetWidth;  //Gör att remove och sedan add funkar - tips från Åke. (Räknar pixlar, annars går det för fort). Kaihan lade till void.
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Det regex email ska checkas mot.
        if (emailPattern.test(email.value.trim())) //Checkar den "trimmade" emailen mot regex.
        {
            document.getElementById("spanEmail").innerHTML = ""; //Tar bort * (id tillagt i html). Skaket är redan borta.
            return true;
        }
        document.getElementById("spanEmail").innerHTML = "*"; //Lägger tillbaka * om den skulle vara borta.
        email.value=""; //Tömmer email-fältet.
        email.classList.add("shakeInField");  //lägger till klassen shakeInField.
        return false;
    }

    function validateName()
    {
        name.classList.remove("shakeInField"); //Tar bort klassen shakeInField (om den finns).
        name.offsetWidth; //Gör att remove och sedan add funkar - tips från Åke. (Räknar pixlar, annars går det för fort). Kaihan lade till void.
        const namePattern = /[^a-zåäöA-ZÅÄÖ\s-]/g; //Det regex namnet ska checkas mot. OBS not tecknet.
        let trimName = name.value.trim(); //Tar bort blanktecken innan och efter texten.
        if ((!namePattern.test(trimName))&&(trimName.length > 0))  //Checkar att bara tillåtna tecknen finns (! på ^) och att det "trimmade" namnet inte är tomt.
        {
            document.getElementById("spanName").innerHTML = ""; //Tar bort * (id tillagt i html). Skaket är redan borta.
            return true;
        }
        document.getElementById("spanName").innerHTML = "*"; //Lägger tillbaka * om den skulle vara borta.
        name.value=""; //Tömmer namn-fältet.
        name.classList.add("shakeInField"); //lägger till klassen shakeInField.
        return false;
    }

    function validateCity() 
    {
        city.classList.remove("shakeInField"); //Tar bort klassen shakeInField (om den finns).
        city.offsetWidth;  //Gör att remove och sedan add funkar - tips från Åke. (Räknar pixlar, annars går det för fort). Kaihan lade till void.
        if (city.value!="")  //Kontrollerar att någon stad är vald.
        { 
            document.getElementById("spanCity").innerHTML = ""; //Tar bort * (id tillagt i html). Skaket är redan borta.
            return true;
        }
        document.getElementById("spanCity").innerHTML = "*";  //Lägger tillbaka * om den skulle vara borta.
        city.classList.add("shakeInField"); //lägger till klassen shakeInField.
        return false;
    }
       
    function validateMessage() 
    {
        msg.classList.remove("shakeInField"); //Tar bort klassen shakeInField (om den finns).
        msg.offsetWidth;  //Gör att remove och sedan add funkar - tips från Åke. (Räknar pixlar, annars går det för fort). Kaihan lade till void.
        if (msg.value.trim()!="") //Kontrollerar att något är inskrivet efter "trimning".
        {
            document.getElementById("spanMsg").innerHTML = ""; //Tar bort * (id tillagt i html). Skaket är redan borta.
            return true;
        }
        document.getElementById("spanMsg").innerHTML = "*";  //Lägger tillbaka * om den skulle vara borta.
        msg.value="";  //Tömmer meddelande-fältet.
        msg.classList.add("shakeInField"); //lägger till klassen shakeInField.
        return false;
    }

    //Kör funktionerna samt sparar retur boolean i variabeler.
    let nameOk = validateName();
    let cityOk = validateCity();
    let messageOk = validateMessage();
    let emailOk = validateEmail();

    if (!(emailOk&&cityOk&&messageOk&&nameOk)) //Om inte alla input är ok sparas skrivs en alert och inget sparas till fil.
    {
        alert ("Please fill in the form correctly!");
    }
    else //Sker om alla input är ok. Filen sparas. Koden kommer från den ursprungliga saveFile.js.
    {
        // This variable stores all the data.
        let data = '\r Name: ' + name.value.trim() + ' \r\n ' +
        'Email: ' + email.value.trim() + ' \r\n ' +
        'City: ' + city.value + ' \r\n ' +
        'Message: ' + msg.value.trim();

        // Convert the text to BLOB.
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'formData.txt'; // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;
        if (window.webkitURL != null) 
        {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else 
        {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }
        newLink.click();
        document.getElementById("show").src="img/thankyou.png";
        document.getElementById("show").classList.add("turnImage"); //Vrider upp Thank You texten.
        document.getElementById("bt").disabled = true; //Disablar send-knappen.
    }
}
