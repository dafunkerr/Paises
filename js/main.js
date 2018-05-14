var campo = "name";
var ascendente = true;


var miPeticion = new XMLHttpRequest();
var paises = null;

function muestraTabla(){
    var inputContinente= document.getElementById("idSelectorContinente");
    var paisesURL = "https://restcountries.eu/rest/v2/region/" + inputContinente.value;
    miPeticion.onreadystatechange = function(){

        console.log("Estado de la petición: " + miPeticion.readyState);
    
        if (miPeticion.readyState === 4){
            // Ya tenemos los datos!!!!!
            
            paises = JSON.parse(miPeticion.responseText);
            console.log(paises);
            console.log(paises.lenght);
            var sort_by = function(field, reverse, primer){

                var key = primer ? 
                    function(x) {return primer(x[field])} : 
                    function(x) {return x[field]};
             
                reverse = !reverse ? 1 : -1;
             
                return function (a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                  } 
             }
             //campo = document.getElementById("idSelectorOrden").value;
             console.log(campo);
             paises.sort(sort_by(campo, ascendente));

            for(var i = idTablaPaises.rows.length - 1; i > 0; i--){
                idTablaPaises.deleteRow(i);
            }
            for (i = 0; i < (paises.length); i ++) {
            
                var row = idTablaPaises.insertRow(i+1); // -1 para indicar que es en la última posición!
        
                var cell0 = row.insertCell(0);  //codigo
                var cell1 = row.insertCell(1);  //nombre
                var cell2 = row.insertCell(2);  //precioCoste
                var cell3 = row.insertCell(3);  //precioCoste
                
        
                cell0.innerHTML = paises[i].name;
                cell1.innerHTML = paises[i].capital;
                cell2.innerHTML = paises[i].population;
                var img = document.createElement('img');
                img.src = paises[i].flag;

                img.width = 100;

          
                cell3.appendChild(img);
            
            
              
                cell0.setAttribute("align","center");
                cell1.setAttribute("align","center");
                cell2.setAttribute("align","center");
                cell3.setAttribute("align","center");
               
               
            }
           
        }

        console.log("Estado de la petición: " + miPeticion.readyState); // Estado 0 previo al open
    }
    miPeticion.open("GET",paisesURL,true);
    miPeticion.send(null);   // no hacemos upload
}

function swap(myArr, indexOne, indexTwo){
    var tmpVal = myArr[indexOne];
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
  }

function cambiaOrden (tipoOrden,nombreOrden){

    var cabecera = "";
    cabecera = document.getElementById("name");
    cabecera.innerHTML= 'Pais';
    cabecera = document.getElementById("capital");
    cabecera.innerHTML= 'Capital';
    cabecera = document.getElementById("population");
    cabecera.innerHTML= 'Población';

    cabecera = document.getElementById(tipoOrden);
    
    campo = tipoOrden;
    ascendente = !ascendente;
    if (ascendente) cabecera.innerHTML= nombreOrden + '<i class="fa fa-caret-square-o-up"></i>';
    else cabecera.innerHTML= nombreOrden + '<i class="fa fa-caret-square-o-down"></i>';

    muestraTabla();
}
