Calculadora CURP
================

Un plugin Jquery para ayudar a calcular el CURP de una persona.

USO
================
Ejemplo de uso:
<pre>
$("#curp-input").curp({
                    nombre: "Julio César",
                    apellido: "Márquez Martínez",
                    fechaNacimiento: "18-04-1989",
                    lugarNacimiento: "NL",
                    sexo: "H"
                },function(){
                    alert('He terminado de calcular el CURP');
                });
</pre>
                
IMPORTANTE**
================
Los siguientes valores son los aceptados por el gobierno mexicano para sus respectivos estados como lugar de nacimiento.

<ul>
<li>Aguascalientes (AS)</li>
<li>Baja California Norte (BC)</li>
<li>Baja California Sur (BS)</li>
<li>Campeche (CC)</li>
<li>Chiapas (CS)</li>
<li>hihuahua (CH)</li>
<li>Coahuila (CL)</li>
<li>Colima (CM)</li>
<li>Distrito Federal (DF)</li>
<li>Durango (DG)</li>
<li>Guanajuato (GT)</li>
<li>Guerrero (GR)</li>
<li>Hidalgo (HG)</li>
<li>Jalisco (JC)</li>
<li>México - Estado de (MC)</li>
<li>Michoacán (MN)</li>
<li>Morelos (MS)</li>
<li>Nayarit (NT)</li>
<li>Nuevo León (NL)</li>
<li>Oaxaca (OC)</li>
<li>Puebla (PL)</li>
<li>Querétaro (QT)</li>
<li>Quintana Roo (QR)</li>
<li>San Luis Potosí (SP)</li>
<li>Sinaloa (SL)</li>
<li>Sonora (SR)</li>
<li>Tabasco (TC)</li>
<li>Tamaulipas (TS)</li>
<li>Tlaxcala (TL)</li>
<li>Veracruz (VZ)</li>
<li>Yucatán (YN)</li>
<li>Zacatecas (ZS)</li>
<li>Serv. Exterior Mexicano (SM)</li>
<li>Extranjero (NE)</li>
</ul>

