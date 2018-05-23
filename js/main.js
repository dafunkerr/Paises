var campo = "name"; //campo por el que ordenar
var ascendente = false;  //usado para el orden
var miPeticion = new XMLHttpRequest();
var paises = null; //array de paises
var pais = 0;
var codigosFronteras = ""; //Usado para pasar varios paises como parámetro
var continentes = []; //array de continentes existentes

function leePaises(tipoLectura) {
    let paisesURL = "https://restcountries.eu/rest/v2/";
    if (tipoLectura == "creaViajando2") {
        paisesURL += "alpha?codes=" + codigosFronteras;
    } else
        if (tipoLectura == "creaPaises") {
            let select = document.getElementById("idSelectorContinente");
            paisesURL += "region/" + select.value;
        } else {
            paisesURL += "all";
        }
    miPeticion.onreadystatechange = function () {
        if (miPeticion.readyState === 4) {
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
        row.setAttribute("onclick", "creaViajando(" + i + ")");
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.setAttribute("align", "center");
        cell1.setAttribute("align", "center");
        cell2.setAttribute("align", "center");
        cell3.setAttribute("align", "center");
        cell4.setAttribute("align", "center");

        cell0.innerHTML = paises[i].translations.es;
        if (paises[i].translations.es == null) {
            cell0.innerHTML = paises[i].name;
        } else {
            cell0.innerHTML = paises[i].translations.es; // Si existe le paso el pais en español
        }
        cell1.innerHTML = paises[i].capital;
        cell2.innerHTML = paises[i].population.toLocaleString();
        cell3.innerHTML = paises[i].currencies[0].code;
        var img = document.createElement('img');
        img.src = paises[i].flag;
        img.className = "responsive";
        img.onclick = "creaViajando(" + i + ")";
        cell4.appendChild(img);
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

    for (let continente of continentes) {
        if (continente != "") {
            var opcion = document.createElement('option');
            opcion.innerHTML = continente;
            opcion.value = continente;
            select.appendChild(opcion);
        }

    }
    leePaises('creaPaises');
}




function creaEstadisticas() {
    //let continentes = [];
    let indice = 0;
    for (let i = 0; i < (paises.length); i++) {
        let continente = paises[i].region;
        if (continente != "") {
            if (continentes.findIndex(indice => indice.region == continente) == -1) {
                continentes[indice] = { region: continente, npaises: 0, poblacion: 0 }
                indice++;
            }
            continentes[continentes.findIndex(indice => indice.region == continente)].npaises++;
            continentes[continentes.findIndex(indice => indice.region == continente)].poblacion += paises[i].population;
        }
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
    creaChart();
}

function creaViajando(paisViajar) {
    let origen = document.getElementById("idBanderaOrigen")
    if (paisViajar == undefined) {
        pais = paises[Math.floor(Math.random() * paises.length)]; //SI es la 1a vez elijo un pais al azar 
    } else {
        origen.appendChild(document.createTextNode(" -> ")); //añade texto al div creado. 
        pais = paises[paisViajar];  //Si no es la 1a vez ya cojo el pais que entra como parámetro en la función
    }
    let img = document.createElement('img');
    img.src = pais.flag;
    img.className = "responsive";
    origen.appendChild(img);

    origen = document.getElementById("idPaisOrigen");
    origen.innerHTML = "Viajando desde " + pais.translations.es;
    if (pais.borders.length == 0) {
        origen.innerHTML += " ... no se puede ir a pie a ningun lado!";
    } else {
        codigosFronteras = "";
        for (let i = 0; i < pais.borders.length; i++ , codigosFronteras += ";") codigosFronteras += pais.borders[i];
        leePaises("creaViajando2");
    }
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

function creaChart() {
    let datosChart = [];
    for (let i = 0; i < continentes.length; i++) {
        datosChart[i] = { label: continentes[i].region, y: continentes[i].poblacion }
    }
    for (let i = 0; i < continentes.length; i++) {
        datosChart[i] = { label: continentes[i].region, y: continentes[i].poblacion }
    }
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
            // text: "GDP Growth Rate - 2016",

        },
        axisY: {
            title: "Población (en miles de millones)",
            suffix: "%",
            includeZero: true
        },
        axisX: {
            title: "Continentes"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#\"%\"",
            dataPoints: datosChart
        }]
    });


    chart.render();
}
