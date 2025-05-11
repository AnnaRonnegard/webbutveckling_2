function Spela() {  //Huvudfunktion. De funktioner som används i den är definierade nedanför.
    
    const urlParams = new URLSearchParams(window.location.search); //Läser in webbläsar-strängen.
    const mittVal = urlParams.get("val"); //Läser in val-värdet i variabeln mittVal.

    let raknaForlost = parseInt(localStorage.getItem("raknaForlost")); //Läser värdet i localStorage "raknaForlost" och parsar det till variabeln "raknaForlost".
    let raknaVinst = parseInt(localStorage.getItem("raknaVinst")); //Läser värdet i localStorage "raknaVinst" och parsar det till variabeln "raknaVinst".
   
    let datorVal = SlumpVal();  //Skapar datorvalet.

    if (mittVal == datorVal) {  //Behandlar utfallet att bägge val är lika.
      document.getElementById("grattisSorryStorId").innerHTML="Det blev oavgjort";
      document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde också " + mittVal + ".";
      document.getElementById(mittVal+"Id").style.display="block";
      
      VinstForlustUtskrift(raknaForlost, raknaVinst);  //Se funktionen nedan.
      return;  //Avslutar isåfall funktionen.
    }

    //Utfallen om de ej är lika, det är sex stycken, behandlas i switchen. Den innehåller utskrifter, samt uppräkning av vinst och förlust variablerna. Variablerna sparas undan i deras respektive localStorage. För att beskåda funktionerna som finns i switchen- se nedan.
    switch (mittVal) { 
      case "sten":
        if (datorVal== "påse") {
          Sorry(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Stenen omslutes av påsen.";
          document.getElementById("paseStenId").style.display="block";
          raknaForlost ++;
          localStorage.setItem("raknaForlost", raknaForlost); 
        }
        else {
          Grattis(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Stenen förstör saxen.";
          document.getElementById("saxStenId").style.display="block";
          raknaVinst ++;
          localStorage.setItem("raknaVinst", raknaVinst);
        }
        VinstForlustUtskrift(raknaForlost, raknaVinst);
        break;
    
      case "sax":
        if (datorVal== "påse") {
          Grattis(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Saxen klipper sönder påsen.";
          document.getElementById("saxPaseId").style.display="block";
          raknaVinst ++;
          localStorage.setItem("raknaVinst", raknaVinst);
        }
        else {
          Sorry(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Saxen förstörs av stenen.";
          document.getElementById("saxStenId").style.display="block";
          raknaForlost ++;
          localStorage.setItem("raknaForlost", raknaForlost);
        }
        VinstForlustUtskrift(raknaForlost, raknaVinst);
        break;

      case "påse": 
          if (datorVal== "sax") {
          Sorry(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Påsen klipps sönder av saxen.";
          document.getElementById("saxPaseId").style.display="block";
          raknaForlost ++;
          localStorage.setItem("raknaForlost", raknaForlost);
        }
        else {
          Grattis(datorVal, mittVal);
          document.getElementById("utskriftId").innerHTML="Påsen omsluter stenen.";
          document.getElementById("paseStenId").style.display="block";
          raknaVinst ++;
          localStorage.setItem("raknaVinst", raknaVinst);
        }
        VinstForlustUtskrift(raknaForlost, raknaVinst);
        break;
      default: { //Sker om inget är valt.
          document.getElementById("utskriftHalvStorId").innerHTML="Du får välja något!";
        }
        break;
    }
}

function Sorry(datorVal, mittVal) { //Utskrift. Datorval skickas med då det är definierat i funktionen Spela().
    document.getElementById("grattisSorryStorId").innerHTML="Sorry!"
    document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde " + datorVal + " och du valde " + mittVal + ".";
}

function Grattis(datorVal, mittVal) { //Utskrift. Datorval skickas med då det är definierat i funktionen Spela().
    document.getElementById("grattisSorryStorId").innerHTML="Grattis!"
    document.getElementById("utskriftHalvStorId").innerHTML="Datorn valde " + datorVal + " och du valde " + mittVal + ".";
}

function VinstForlustUtskrift(raknaForlost, raknaVinst) { //Utskrifts funktion som även räknar ut om du leder eller ligger under. Variablerna skickas med då de definieras i funktionen Spela().
    if (raknaVinst==raknaForlost) document.getElementById("summeringId").innerHTML="Det är lika mellan er!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;
    if (raknaVinst>raknaForlost) document.getElementById("summeringId").innerHTML="Du leder!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;
    if (raknaVinst<raknaForlost) document.getElementById("summeringId").innerHTML="Du ligger under!<br><br>Antalet vinster: " + raknaVinst + "<br>Antalet förluster: " + raknaForlost;
}
   
function SlumpVal() { //Funktion som används till datorns val.
    let slump =  Math.floor(Math.random()*3); //Slumpgeneratorn "Math.random" genererar tal från 0 upp till 1 (inte till och med 1). "floor" avrundar nedåt till närmaste heltal. Denna uträkning ger alltså ett tal med värdet 0, 1 eller 2.
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