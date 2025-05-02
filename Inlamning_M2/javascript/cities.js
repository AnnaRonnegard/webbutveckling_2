let cities = [];  //Skapar en array. Jag skapar den här. Den blir global och den ska inte skapas om när man adderar en stad.
let cntAdd= 0; //Skapar en räknare som räknar antalet adderinger av en ny stad. Jag skapar den här, så att den inte nollställs när man adderar en stad. Den blir också global och kan enkelt nollställas vid reset.


function addCity() //En funktion som adderar en stad.
{
    let cityIn = document.getElementById("AddCityId").value.trim(); //Letar rätt på texten (value) i input-fältet med id=AddCityId och läser in den i variabeln cityIn. Trim tar bort blanktecken före och efter stadens namn.
    if (cityIn.length == 0) //Om ingen text fanns i city-input fältet.
        { 
            alert("You try to add an empty line!\nNo city was added!");
            document.getElementById("AddCityId").value = ""; //Tömmer city-input fältet
            return; //Avslutar funktionen addCity().
        }
    const regex =  /[^A-ZÅÄÖa-zåäö]/g; //^betyder not (icke). / är syntax. g gör att inte bara första matchen registreras.
    const foundNonLetter = cityIn.match(regex); //matchar cityIn mor regex.
    if (foundNonLetter == null) //Den blir satt till null om inga andra tecken än A-Ö eller a-ö finns.
        {
            pushCity(cityIn); //Anropar en funktion som adderar staden (något formaterad) till arrayen, fast bara så länge det är mindre än 5 städer i den - se nedan.
        }
    else //Sker om andra tecken än A-Ö eller a-ö finns i cityIn.
        {
            alert("You have written something else but letters (including åäö)!\nNo city was added!");
        }
    document.getElementById("AddCityId").value = ""; //Tömmer city-input fältet
}


function pushCity(cityIn) 
{
    let city = cityIn.charAt(0).toUpperCase() + cityIn.slice(1); //Skapar variabeln city och Sätter första bokstaven till storbokstav och adderar resterande bokstäverna som dom är.
    if (cntAdd < 5) //Kollar att inte fler är 5 städer har adderats. (cntAdd börjar på 0)
    {
        cities.push(city); //Lägger till city i arrayen cities.
        document.getElementById("CityId"+cntAdd).innerHTML = city; //Skriver ut staden i den textarea som har id=CityId0, CityId1 etc.
        writeInfoText(city); //Anropar en funktion, writeInfoText(), för info - se nedan.
        cntAdd++; //Räknar upp hur många städer som adderats.
    }
    else
    {
        document.getElementById("AddCityId").disabled = true;  //låser city-input fältet
        alert("You have reached the maximum limit of 5 cities!\nNo city was added!");
    }
}


function writeInfoText(city) //En funktion som skriver ut informationstext i en paragraf på hemsidan.
{
    let cntCity = 0; //Initerar en räknare av hur många gånger staden förekommer i arrayen.
    for (let i = 0; i < cities.length; i++) //Loopar igenom arrayen.
        { 
            if (cities[i] == city) //Kontrollerar om staden matchar.
            {
                cntCity++; //Räknar isåfall upp variabeln.
            }
        }
    let cityText = "The city you added was " + city.toUpperCase() + ". The first letter is " + city[0] + ". The city exist " + cntCity + " times in the list. The city's name consist of " + city.length + " letters."; //En textsträng med diverse information som ska skrivas ut.
    document.getElementById("WriteTextId").innerHTML = cityText; //Skriver ut textsträngen i paragrafen med id=WriteTextId.
}


function sortCities() //En funktion som sorterar och skriver ut de sorterade städerna.
{
    cities.sort(); //Sorterar arrayen.
    for (let i = 0; i < cities.length; i++) //Loopar igenom.
        {
            document.getElementById("CityId"+i).innerHTML = cities[i]; //Skriver ut i textarean med id=CityId0, CityId1 etc.
        }
    document.getElementById("WriteTextId").innerHTML = ""; //Raderar texten i paragrafen.
}


function resetFix() //Anropas vid tryck på Reset-knappen.
{
    for (let i = 0; i < 5; i++) //Loopar igenom textfälten. Det finns 5 strycken.
        {
            document.getElementById("CityId"+i).innerHTML = ""; //Tömmer textarean som har id=CityId0, CityId1 etc.
        }
        cities = []; //Tömmer arrayen med städer.
        document.getElementById("WriteTextId").innerHTML = ""; //Raderar texten i paragrafen.
        cntAdd = 0;     //Nollställer variabeln som räknar antalet adderade städer.
        document.getElementById("AddCityId").disabled = false; //låser upp city-input fältet
}