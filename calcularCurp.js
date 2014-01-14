/* LICENSE 
 * The MIT License (MIT)
 *
 *  Copyright (c) <2014> <Julio César Márquez Martínez>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


//Variables Globales
var vocales,nombres;

vocales = ["A","E","I","O","U"];
nombres = ["MARÍA","MARIA","JOSÉ","JOSE"];

/**
 * Recibe un string para poder quitar acentos y eñes
 * 
 * @param {String} str
 * @returns {String}
 */
function limpiaString(str){
    
    str = str.replace(/\Á|á/g, 'A');
    str = str.replace(/\É|é/g, 'E');
    str = str.replace(/\Í|í/g, 'I');
    str = str.replace(/\Ó|ó/g, 'O');
    str = str.replace(/\Ú|ú/g, 'U');
    str = str.replace(/\Ñ|ñ/g, 'N');
    
    return str;
}

/**
 * Recibe un string para verificar si esta separadao por un espacio y si existe otro strong después del espacio.
 * 
 * @param {String} arreglo Un arreglo de caracteres
 * @returns {String} El segundo string en caso de ser encontrado, si no existe regresa SINDEFINIR.
 */
function segundoString(arreglo){
    var segundo;
    if(arreglo[1] != undefined){
        segundo = arreglo[1].toUpperCase();
        //alert(nombre2);
    }else{
        segundo = "SINDEFINIR";
    }
    
    return segundo;
}

/**
 * Recibe una fecha y la formatea para el curp, es decir con formato yymmdd Ej. (890418) 
 * 
 * @param {String} fecha Con formato dd-mm-yyyy Ej. (18-04-1989)
 * @returns {String} Fecha con formato yyddmm Ej. (890418)
 */
function getFecha(fecha){
    return fecha[8]+fecha[9]+fecha[3]+fecha[4]+fecha[0]+fecha[1];
}

/**
 * Obtiene la primer consonante interna de un String
 * 
 * @param {String} string Cadena a verificar
 * @returns {char} Consonante Interna
 */
function consonanteInterna(string){
    var tmp,tmp1;
    tmp1 = 0;
    for (var i = 0; i < string.length; i++) {
        if (tmp1 < 2 && $.inArray(string[i], vocales) == -1) {
            //alert(vocales);
            //alert(apater[i]);
            tmp1 = tmp1 + 1;
            tmp = string[i];
        }
    }
    
    return tmp;
}

(function($) {
    /**
     * Función CURP. Calcula el CURP en base a ciertas opciones.
     * 
     * @param {array} options Opciones para el calculo de la CURP.
     * @param {function} callbackFunction Posible función a ejecutar antes de terminar el proceso.
     * @returns {_L99.$.fn@call;val|_L99.$.fn@call;html} Puede regresar el valor calculado a un input o un div/span
     */
    $.fn.curp = function(options,callbackFunction) {
        
        //Variables locales
        var curp,nombre1,nombre2,apater,amater,tmp,tmp1;
        
        //Valores por default
        var settings = $.extend({
            nombre: "PrimerNombre SegundoNombre", //Separados por un Espacio.
            apellido: "ApellidoPaterno ApellidoMaterno", //Separados por un espacio.
            fechaNacimiento: $.datepicker.formatDate('dd-mm-yy', new Date()), //Por default la fecha de hoy.
            lugarNacimiento: "NE", //Por default lo trata como extranjero. Ver lista de valores aceptados.
            sexo: "H" //Sólo puede ser H o M.            
        }, options);
        
        //Limpiamos de acentos los nombres y apellidos.
        settings.nombre = limpiaString(settings.nombre);
        settings.apellido = limpiaString(settings.apellido);
        
        //Separamos el nombre para obtener el segundo nombre.
        tmp = settings.nombre.split(" ");
        nombre1 = tmp[0].toUpperCase();
        nombre2 = segundoString(tmp);
        
        //Separamos el apellido en paterno y materno.
        tmp = settings.apellido.split(" ");
        apater = tmp[0].toUpperCase();
        amater = segundoString(tmp);
        
        //Obtenemos la primera vocal del apellido paterno
        tmp1 = 0;
        for (var i=0; i < apater.length; i++) {
            if(tmp1 == 0 && $.inArray(apater[i], vocales) > -1){
                //alert(vocales);
                //alert(apater[i]);
                tmp1 = 1;
                tmp = apater[i];
            }
        }
        curp = apater[0] + tmp; 
        
        //Obtenemos la primer letra del apellido materno
        curp = curp + amater[0];
        
        //Obtenemos la primer letra del nombre, si el primer nombre es maria o jose y existe un segundo nombre se utiliza el segundo nombre.
        if($.inArray(nombre1,nombres) > -1 && nombre2 != 'SINDEFINIR'){
            curp = curp + "" + nombre2[0];
        }else{
            curp = curp +""+nombre1[0];
        }
        
        //Obtenemos la fecha de nacimiento, el sexo y el lugar de nacimiento
        curp = curp+""+getFecha(settings.fechaNacimiento);
        curp = curp + settings.sexo.toUpperCase() + settings.lugarNacimiento;
        
        //Obtenemos la primer consonante interna del apellido paterno,materno y el primer nombre
        curp = curp + consonanteInterna(apater);
        curp = curp + consonanteInterna(amater);
        curp = curp + consonanteInterna(nombre1);
        
        //Los dos últimos digitos son de control generados por el gobierno para evitar duplicados y no tenemos acceso a ellos.
        curp = curp + "00";
        
        //Se ejecuta función callback si existe.
        if ($.isFunction(callbackFunction)) {
            callbackFunction.call();
        }
        
        //Se verifica que tipo de elemento DOM es this para ejecutar la instrucción correcta.
        tmp = this[0].tagName;
        if(tmp == 'INPUT'){
            return this.val(curp);
        }else{
            return this.html(curp);
        }
        
    };
}(jQuery));

