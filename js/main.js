var campo = "name";
<<<<<<< HEAD
var ascendente = true;


var miPeticion = new XMLHttpRequest();va
=======
var ascendente = false;
var miPeticion = new XMLHttpRequest();
>>>>>>> f2f857e5ede7f93ff8d2a654272b1f1fa6cb4372
var paises = null;
var pais = 0;
var codigosFronteras = "";
var continentes = [];

<<<<<<< HEAD



function muestraTabla(){
    

    var inputContinente= document.getElementById("idSelectorContinente").value;
    var paisesURL = "https://restcountries.eu/rest/v2/region/" + inputContinente;
    miPeticion.onreadystatechange = function(){

        console.log("Estado de la petición: " + miPeticion.readyState);
    
        if (miPeticion.readyState === 4){
            // Ya tenemos los datos!!!!!
            
=======
function leePaises(tipoLectura, continente) {
    let paisesURL = "https://restcountries.eu/rest/v2/";
    if (tipoLectura == "creaViajando2") {
        paisesURL += "alpha?codes=" + codigosFronteras;
    } else
        if (tipoLectura == "creaPaises") {
            paisesURL += "region/" + continente;
        } else {
            paisesURL += "all";
        }
    miPeticion.onreadystatechange = function () {
        if (miPeticion.readyState === 4) {
>>>>>>> f2f857e5ede7f93ff8d2a654272b1f1fa6cb4372
            paises = JSON.parse(miPeticion.responseText);
            window[tipoLectura](); // Me permite ir a una funcion diferente según parámetro pasado 
        }
    }
    miPeticion.open("GET", paisesURL, true);
    miPeticion.send(null);
}

function creaPaises() {
    var sort_by = function (field, reverse, primer) {
        var key = primer ?
            function (x) { return primer(x[field]) } :
            function (x) { return x[field] };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
    paises.sort(sort_by(campo, ascendente));
    for (var i = idTablaPaises.rows.length - 1; i > -1; i--) {
        idTablaPaises.deleteRow(i);
    }
    for (i = 0; i < (paises.length); i++) {
        var row = idTablaPaises.insertRow(i); // -1 para indicar que es en la última posición!
        var cell0 = row.insertCell(0);  //codigo
        var cell1 = row.insertCell(1);  //nombre
        var cell2 = row.insertCell(2);  //precioCoste
        var cell3 = row.insertCell(3);  //precioCoste
        var cell4 = row.insertCell(4);  //precioCoste

        cell0.setAttribute("align", "center");
        cell1.setAttribute("align", "center");
        cell2.setAttribute("align", "center");
        cell3.setAttribute("align", "center");
        cell4.setAttribute("align", "center");

        cell0.innerHTML = paises[i].translations.es;
        if (paises[i].translations.es == null) {
            cell0.innerHTML = paises[i].name;
        } else {
            cell0.innerHTML = paises[i].translations.es;
        }
        cell1.innerHTML = paises[i].capital;
        cell2.innerHTML = paises[i].population.toLocaleString();
        cell3.innerHTML = paises[i].currencies[0].code;
        var img = document.createElement('img');
        img.src = paises[i].flag;
        img.width = 100;
        img.onclick = "creaViajando(" + i + ")";
        cell4.appendChild(img);
        if (arguments.callee.caller.name == "creaViajando2") {
            var cell5 = row.insertCell(5);  //precioCoste
            cell5.setAttribute("align", "center");
            cell5.innerHTML = "<button onclick='creaViajando(" + i + ")' type='button'>Viaja</button>";
        }
    }
}

function swap(myArr, indexOne, indexTwo) {
    var tmpVal = myArr[indexOne];
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
}

function cambiaOrden(tipoOrden, nombreOrden) {
    var cabecera = "";
    cabecera = document.getElementById("name");
    cabecera.innerHTML = 'Pais';
    cabecera = document.getElementById("capital");
    cabecera.innerHTML = 'Capital';
    cabecera = document.getElementById("population");
    cabecera.innerHTML = 'Población';
    cabecera = document.getElementById(tipoOrden);
    campo = tipoOrden;
    ascendente = !ascendente;
    if (ascendente) cabecera.innerHTML = nombreOrden + '<i class="fa fa-caret-square-o-down"></i>';
    else cabecera.innerHTML = nombreOrden + '<i class="fa fa-caret-square-o-up"></i>';
    leePaises('creaPaises', paises[0].region);
}

function creaSelector() {
    select = document.getElementById('idSelectorContinente');
    select.innerHTML = "";
    for (let i = 0; i < (paises.length); i++) {
        let conti = paises[i].region;
        if (!continentes.includes(conti)) continentes.push(conti);
    }
    creaLineaSelector();
}

function creaLineaSelector() {
    for (let continente of continentes) {
        var opcion = document.createElement('li');
        opcion.innerHTML = '<a href="#" ' + 'onclick="leePaises(' + "'creaPaises'" + "," + "'" + continente + "')" + '">' + continente + '</a>';
        select.appendChild(opcion);
    }
}

function creaEstadisticas() {
    let continentes = [];
    let indice = 0;
    for (let i = 0; i < (paises.length); i++) {
        let continente = paises[i].region;
        if (continentes.findIndex(indice => indice.region == continente) == -1) {
            continentes[indice] = { region: continente, npaises: 0, poblacion: 0 }
            indice++;
        }
        continentes[continentes.findIndex(indice => indice.region == continente)].npaises++;
        continentes[continentes.findIndex(indice => indice.region == continente)].poblacion += paises[i].population;
    }

    for (i = 0; i < (continentes.length); i++) {
        var row = idTablaEstadisticas.insertRow(i); // -1 para indicar que es en la última posición!
        var cell0 = row.insertCell(0);  
        var cell1 = row.insertCell(1);  
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);  
        cell0.setAttribute("align", "center");
        cell1.setAttribute("align", "center");
        cell2.setAttribute("align", "center");
        cell3.setAttribute("align", "center");
        cell0.innerHTML = continentes[i].region;
        cell1.innerHTML = continentes[i].npaises;
        cell2.innerHTML = continentes[i].poblacion.toLocaleString();
        cell3.innerHTML = Math.floor(continentes[i].poblacion / continentes[i].npaises).toLocaleString();
    }
    creaSelector();
}

function creaViajando(paisViajar) {
    if (paisViajar == undefined) {
        pais = paises[Math.floor(Math.random() * paises.length)]; //SI es la 1a vez elijo un pais al azar 
    } else {
        pais = paises[paisViajar];  //Si no es la 1a vez ya cojo el pais que entra como parámetro en la función
    }
    document.getElementById("idPaisOrigen").innerHTML = "Viajando desde " + pais.translations.es;
    if (pais.borders.length == 0) {
        document.getElementById("idPaisOrigen").innerHTML += " ... no se puede ir a pie a ningun lado!";
    } else {
        codigosFronteras = "";
        for (let i = 0; i < pais.borders.length; i++ , codigosFronteras += ";") codigosFronteras += pais.borders[i];
        leePaises("creaViajando2");
    }
    creaSelector();
}

function creaViajando2() {
    creaPaises("viajando");
}

function viajando() {
    leePaises('creaViajando');
}

function estadisticas() {
    leePaises('creaEstadisticas');
}