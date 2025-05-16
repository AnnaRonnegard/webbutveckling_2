//Dessa två ska vara noll vid uppstart och efter reset, men inte annars. De initieras här, så att de inte nollställs varje gång man spelar;
let raknaVinst = 0;
let raknaForlost = 0;

function spela() { //Huvudfunktion. De funktioner som används i den är definierade nedanför.

    //Läser in angivet val i variabeln val.
    let val = "";
    if (document.getElementById("sten").checked==true) {
      val = "sten";
    }
    if (document.getElementById("sax").checked==true) {
      val = "sax";
    }
    if (document.getElementById("pase").checked==true) {
      val = "påse";
    }

    rensaResultatUtskrift(); //Tar bort resultatutskriften. Behövs då man kör mer än en gång.
    
    document.getElementById("resetId").style.display="block"; //Visar reset-knppen om den är dold, som efter uppstart och efter reset.

    let datorVal = slumpVal(); //Skapar datorvalet.

    if (val == datorVal) { //Behandlar utfallet att bägge val är lika.
      document.getElementById("grattisSorryStorId").innerHTML="Det blev oavgjort";
      document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde också " + val + ".";
      document.getElementById(val +"Id").style.display="block";
      vinstForlustUtskrift(); //Se funktionen nedan.
      return; //Avslutar isåfall funktionen.
    }

     //Utfallen om de ej är lika, det är sex stycken, behandlas i switchen. Den innehåller utskrift på resultat sidan, samt uppräkning av vinst och förlust variablerna. För att beskåda funktionerna som finns i switchen - se nedan.
    switch (val) {
      case "sten":
        if (datorVal== "påse") {
          sorry(datorVal);
          document.getElementById("utskriftId").innerHTML="Stenen omslutes av påsen.";
          document.getElementById("paseStenId").style.display="block";
          raknaForlost ++;
        }
        else {
          grattis(datorVal);
          document.getElementById("utskriftId").innerHTML="Stenen förstör saxen.";
          document.getElementById("saxStenId").style.display="block";
          raknaVinst ++;
        }
        vinstForlustUtskrift();
        break;
    
     case "sax":
        if (datorVal== "påse") {
          grattis(datorVal);
          document.getElementById("utskriftId").innerHTML="Saxen klipper sönder påsen.";
          document.getElementById("saxPaseId").style.display="block";
          raknaVinst ++;
        }
        else {
          sorry(datorVal);
          document.getElementById("utskriftId").innerHTML="Saxen förstörs av stenen.";
          document.getElementById("saxStenId").style.display="block";
          raknaForlost ++;
        }
        vinstForlustUtskrift();
        break;

    case "påse": 
        if (datorVal== "sax") {
          sorry(datorVal);
          document.getElementById("utskriftId").innerHTML="Påsen klipps sönder av saxen.";
          document.getElementById("saxPaseId").style.display="block";
          raknaForlost ++;
        }
        else {
          grattis(datorVal);
          document.getElementById("utskriftId").innerHTML="Påsen omsluter stenen.";
          document.getElementById("paseStenId").style.display="block";
          raknaVinst ++;
        }
        vinstForlustUtskrift();
        break;
    default: { //Sker om inget är valt.
          document.getElementById("utskriftHalvStorId").innerHTML="<br>Du får välja något!";
          document.getElementById("resetId").style.display="none";
        }
        break;
    }
}

function sorry(datorVal) { //Utskrift. Datorval skickas med då det är definierat i funktionen spela().
    document.getElementById("grattisSorryStorId").innerHTML="Sorry!"
    document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde " + datorVal + ".";
}

function grattis(datorVal) { //Utskrift Datorval skickas med då det är definierat i funktionen spela().
    document.getElementById("grattisSorryStorId").innerHTML="Grattis!"
    document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde " + datorVal + ".";
}

function vinstForlustUtskrift() { //Utskrifts funktion som även räknar ut om du leder eller ligger under. Variablerna som används är "globala".
    if (raknaVinst==raknaForlost) document.getElementById("summeringId").innerHTML="Det är lika mellan er!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;

    if (raknaVinst>raknaForlost) document.getElementById("summeringId").innerHTML="Du leder!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;

    if (raknaVinst<raknaForlost) document.getElementById("summeringId").innerHTML="Du ligger under!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;

    document.getElementById("spelaId").innerHTML="Spela igen?"; //Byrer texten ovan formuläret.
}
   
function slumpVal() {
    let slump =  Math.floor(Math.random()*3); //Slumpgeneratorn "Math.random" genererar tal från 0 upp till 1 (inte till och med 1). "floor" avrundar nedåt till närmaste heltal. Denna uträkning ger alltså ett tal med värdet 0, 1 eller 2.

    //returnerar slump-valet.
    if (slump==0) {
      return "sten";
    }
    if (slump==1) {
      return "sax";
    }
    if (slump==2) {
      return "påse";
    }
}

function rensaResultatUtskrift() { //Tar bort resultatutskriften.
    document.getElementById("grattisSorryStorId").innerHTML="";
    document.getElementById("utskriftHalvStorId").innerHTML="";
    document.getElementById("utskriftId").innerHTML="";
    document.getElementById("summeringId").innerHTML="";
    document.getElementById("saxPaseId").style.display="none";
    document.getElementById("paseStenId").style.display="none";
    document.getElementById("saxStenId").style.display="none";
    document.getElementById("saxId").style.display="none";
    document.getElementById("påseId").style.display="none";
    document.getElementById("stenId").style.display="none";
}

function reset() {
  //Nollställer radioknapparna:
    document.getElementById("sten").checked=false;
    document.getElementById("sax").checked=false;
    document.getElementById("pase").checked=false;

     //Döljer resetknappen.
    document.getElementById("resetId").style.display="none";

     //Byter text ovan valet.
    document.getElementById("spelaId").innerHTML="Spela?";

    //nollställer räknarna.
    raknaVinst = 0;
    raknaForlost = 0;

    rensaResultatUtskrift(); //Tar bort resultatutskriften.
}
