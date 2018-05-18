var paises = null;
var miPeticion = new XMLHttpRequest();

function leeContinentes(){
    
    var paisesURL = "https://restcountries.eu/rest/v2/all";
    miPeticion.onreadystatechange = function(){

        console.log("Estado de la petición: " + miPeticion.readyState);
    
        if (miPeticion.readyState === 4){
            // Ya tenemos los datos!!!!!
            
            paises = JSON.parse(miPeticion.responseText);
            console.log(paises);
            console.log(paises.lenght);
            
            /*
            for(var i = idTablaPaises.rows.length - 1; i > 0; i--){
                idTablaPaises.deleteRow(i);
            }*/

            
            var continentes = ["africa","americas","europe","oceania","asia"];
            var propiedades = continentes["numPaises","poblacion","poblacionMedia"];
             
            propiedades["africa"]["numPaises"]= 3333;
            propiedades["americas"]["poblacion"]= 4444;

            console.log(propiedades["americas"]["poblacion"]);
            console.log(propiedades["asia"]["poblacion"]);


            for (i = 0; i < (paises.length); i ++) {
                
            }

 /*       
                var row = idTablaPaises.insertRow(i+1); // -1 para indicar que es en la última posición!
        
                var cell0 = row.insertCell(0);  //codigo
                var cell1 = row.insertCell(1);  //nombre
                var cell2 = row.insertCell(2);  //precioCoste
                var cell3 = row.insertCell(3);  //precioCoste
                var cell4 = row.insertCell(4);  //precioCoste
                
        
                cell0.innerHTML = paises[i].name;
                cell1.innerHTML = paises[i].capital;
                cell2.innerHTML = paises[i].population;
                cell3.innerHTML = paises[i].currencies[0].code;
                var img = document.createElement('img');
                img.src = paises[i].flag;

                img.width = 100;

          
                cell4.appendChild(img);
            
            
              
                cell0.setAttribute("align","center");
                cell1.setAttribute("align","center");
                cell2.setAttribute("align","center");
                cell3.setAttribute("align","center");
                cell4.setAttribute("align","center");
               
               
            
   */        
        }

        console.log("Estado de la petición: " + miPeticion.readyState); // Estado 0 previo al open
    }
    miPeticion.open("GET",paisesURL,true);
    miPeticion.send(null);   // no hacemos upload
}

leeContinentes();