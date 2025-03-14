/*Construcción de consultas a partir de una especificación
Plantea ahora una consulta para obtener las descripciones de los materiales entregados en el año 2000.
Recuerda que la fecha puede indicarse como '01-JAN-2000' o '01/01/00'.
*/
USE rcortse;

SELECT M.descripcion
FROM materiales M, entregan E
WHERE M.clave = E.clave 
AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31';

/*
Obtén los números y denominaciones de los proyectos con las fechas y 
cantidades de sus entregas, ordenadas por número de proyecto, presentando 
las fechas de la más reciente a la más antigua.
*/
USE rcortse;

SELECT P.numero, P.denominacion, E.fecha, E.cantidad
FROM proyectos P
JOIN entregan E ON P.numero = E.numero
-- WHERE P.numero = E.numero
ORDER BY E.fecha DESC, cantidad ASC;

/*
Operadores de cadena

El operador LIKE se aplica a datos de tipo cadena y se usa para 
buscarregistros, es capaz de hallar coincidencias dentro de 
una cadena bajo un patrón dado.

También contamos con el operador comodín (%), que coincide con 
cualquier cadena que tenga cero o más caracteres. 
Este puede usarse tanto de prefijo como sufijo.
*/

SELECT * FROM materiales where Descripcion LIKE 'Si%';

/*
¿Qué resultado obtienes? Devuelve todos los materiales con una descripción que comience por Si
Explica que hace el símbolo '%'.
	Si% -> cualquier palabra que comience con Si
	SI%a -> cualquier palabra que comeince con Si y termine con a
	%Si% -> Palarbas que contengan Si en cualquier parte
¿Qué sucede si la consulta fuera : LIKE 'Si' ?
	Solo devuelve un registro que tenga solamente Si en descripción
¿Qué resultado obtienes?
Obtengo aquellas descripciones que empiecen por Si y que tengan lo que sea despues
Sillar rosa
Sillar gris
Explica a qué se debe este comportamiento.
LIKE ayuda a buscar valores identicos a Si
*/

/*
Otro operador de cadenas es el de concatenación, (+, +=) este operador concatena dos o más cadenas de caracteres.
Su sintaxis es : Expresión + Expresión.
Un ejemplo de su uso, puede ser: Un ejemplo de su uso, puede ser:
*/

SELECT CONCAT(descripcion, ', ', CAST(precio AS CHAR)) AS Nombre    FROM Materiales;

-- DECLARE @foo varchar(40); DECLARE NO FUNCIONA EN WORKBENCH
-- DECLARE @bar varchar(40); DECLARE NO FUNCIONA EN WORKBENCH
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? ' ;
SET @foo = CONCAT(@foo, ' obtienes?');
SELECT CONCAT(@foo, @bar) AS Resultado;

/*
¿Qué resultado obtienes de ejecutar el siguiente código?
Obtengo -> ¿Que resultado obtienes? ¿¿¿??? 
¿Para qué sirve DECLARE? En este caso declare no funciona dentro de workbench
Pero el Declare sirve para declarar variables dentro de un bloque de código de SQL
En este caso solamente se usa el SET para declarar variables
¿Cuál es la función de @foo?
Variable que almacena la cadena de texto
¿Que realiza el operador SET?
Asigna un valor a una variable
¿Para qué sirve el @bar?
Dentro de SET @bar = ' ¿¿¿??? '
@bar guardara la cadena de texto
*/

-- Ahora explica el comportamiento, función y resultado de cada una de las siguientes consultas:

SELECT RFC FROM Entregan WHERE RFC LIKE '[A-D]%'; -- Funciona en SQL Server
SELECT RFC FROM Entregan WHERE RFC REGEXP '^[A-D]'; -- Si funciona en Workbench
/*Lo que trata de hacer esta consulta es buscar aquellos RFC dentro de Entregan
en donde el RFC comience con una letra entre A-D
*/
SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%'; --  Funcionaeen SQL Server
SELECT RFC FROM Entregan WHERE RFC REGEXP '^[^A]'; -- Si funciona en Workbench
/*Lo que hace esta función es buscar aquellos RFC que no empiecen por A
*/
SELECT Numero FROM Entregan WHERE Numero LIKE '___6';
/*Esta funcion se encarga de buscar aquellos numeros en el que
los primeros tres número no importan y que termine con 6
*/

SELECT Clave,RFC,Numero,Fecha,Cantidad
FROM Entregan
WHERE Numero Between 5000 and 5010;

-- ¿Cómo filtrarías rangos de fechas?

SELECT Clave, RFC, Numero, Fecha, Cantidad
FROM Entregan
WHERE Fecha BETWEEN '2003-01-01' AND '2004-12-31';
-- -----------------------------------------
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero Between 5000 and 5010 AND
Exists ( SELECT P.RFC
FROM Proveedores P
WHERE P.RazonSocial LIKE 'La%' and E.RFC = P.RFC
	   );

/*
¿Qué hace la consulta?
Selecciona RFC, Cantidad, Fecha y Numero de la tabla entregan en donde el numero este entre 5000-5010
Y que ademas exista dentro de Proovedores y que la Razon social empiece con La
¿Qué función tiene el paréntesis ( ) después de EXISTS?
Define la subconsulta y se busca aquellos RFC que empiecen por La
*/

-- Tomando de base la consulta anterior del EXISTS, realiza el query que devuelva el mismo resultado, pero usando el operador IN
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero Between 5000 and 5010 
AND E.RFC IN ( SELECT P.RFC
FROM Proveedores P
WHERE P.RazonSocial LIKE 'La%' and E.RFC = P.RFC
	   );
       
/*
Tomando de base la consulta anterior del EXISTS, realiza el query que devuelva el 
mismo resultado, pero usando el operador NOT IN Realiza un ejemplo donde apliques 
algún operador : ALL, SOME o ANY.
*/

-- NOT IN
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero Between 5000 and 5010 
AND E.RFC NOT IN ( 
					SELECT P.RFC
					FROM Proveedores P
					WHERE P.RazonSocial LIKE 'La%'
				);

-- ANY
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero BETWEEN 5000 AND 5010
AND E.RFC > ANY (
    SELECT P.RFC
    FROM Proveedores P
    WHERE P.RazonSocial LIKE 'La%'
);
-- -------------------------------
-- SELECT TOP 2 * FROM Proyectos -- No funciona
SELECT * FROM Proyectos LIMIT 2; -- Versión correcta
/*¿Qué hace la anterior sentencia? Explica por qué.
Devuelve los primeros dos registros de la tabla proyectos
Esto lo define el LIMIT 2
*/

SELECT TOP Numero FROM Proyectos; -- No funcioan;
-- Versión correcta
SET @limite = (SELECT Numero FROM Proyectos LIMIT 1);
SET @query = CONCAT('SELECT * FROM Proyectos LIMIT ', @limite);
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
/*¿Qué sucede con la anterior consulta? Explica por qué.
Genera y ejecuta dinamicamente un SELECT usando un LIMIT para la tabla Proyectos
*/
-- ----------------------------------------

-- Agrega a la tabla materiales la columna PorcentajeImpuesto con la instrucción:
ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);
-- A fin de que los materiales tengan un impuesto, les asignaremos impuestos 
-- ficticios basados en sus claves con la instrucción:
UPDATE materiales SET PorcentajeImpuesto = 2 * clave / 1000 WHERE clave IS NOT NULL;
-- esto es, a cada material se le asignará un impuesto igual al doble de su clave dividida entre diez.

-- Revisa la tabla de materiales para que compruebes lo que hicimos anteriormente.

/*¿Qué consulta usarías para obtener el importe de las entregas es decir, el 
total en dinero de lo entregado, basado en la cantidad de la entrega y el 
precio del material y el impuesto asignado?
*/
SELECT E.cantidad * M.precio * (1 + M.PorcentajeImpuesto / 100) AS importe_total
FROM entregas E
JOIN materiales M ON E.clave_material = M.clave;

/*
Comprueba lo anterior, creando vistas para cinco de las consultas que planteaste 
anteriormente en la práctica . Posteriormente revisa cada vista creada para 
comprobar que devuelve el mismo resultado.
*/
-- VISTA 1
SELECT * FROM Vista1;

CREATE VIEW Vista1 AS
SELECT M.descripcion
FROM materiales M, entregan E
WHERE M.clave = E.clave 
AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31';

SELECT M.descripcion
FROM materiales M, entregan E
WHERE M.clave = E.clave 
AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31';

-- VISTA 2
SELECT * FROM Vista2;

CREATE VIEW Vista2 AS
SELECT P.numero, P.denominacion, E.fecha, E.cantidad
FROM proyectos P
JOIN entregan E ON P.numero = E.numero
-- WHERE P.numero = E.numero
ORDER BY E.fecha DESC, cantidad ASC;

SELECT P.numero, P.denominacion, E.fecha, E.cantidad
FROM proyectos P
JOIN entregan E ON P.numero = E.numero
-- WHERE P.numero = E.numero
ORDER BY E.fecha DESC, cantidad ASC;
-- VISTA 3
CREATE VIEW Vista3 AS
SELECT * FROM materiales WHERE Descripcion LIKE 'Si%';

SELECT * FROM materiales WHERE Descripcion LIKE 'Si%';
-- VISTA 4
CREATE VIEW Vista4 AS
SELECT RFC FROM Entregan WHERE RFC REGEXP '^[A-D]';

SELECT RFC FROM Entregan WHERE RFC REGEXP '^[A-D]';

-- VISTA 5
CREATE VIEW Vista5 AS
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero Between 5000 and 5010 
AND E.RFC IN ( SELECT P.RFC
FROM Proveedores P
WHERE P.RazonSocial LIKE 'La%' and E.RFC = P.RFC
	   );
       
SELECT E.RFC, E.Cantidad, E.Fecha, E.Numero
FROM Entregan E
WHERE E.Numero Between 5000 and 5010 
AND E.RFC IN ( SELECT P.RFC
FROM Proveedores P
WHERE P.RazonSocial LIKE 'La%' and E.RFC = P.RFC
	   );
       
-- ----------------------------------------------------------------
-- Los materiales (clave y descripción) entregados al proyecto "México sin ti no estamos completos".
-- SENTENCIA
	SELECT M.clave, M.descripcion
    FROM materiales M, entregan E
    WHERE M.clave = E.clave
    AND E.numero = 5003;
    
    SELECT M.clave, M.descripcion
    FROM materiales M, entregan E, proyectos P
    WHERE M.clave = E.clave and E.numero = P.numero
    AND P.denominacion = 'México sin ti no estamos completos';
    
/* 3 renglones regresados
SALIDA 1030 - '1030', 'Varilla 4/33'
   SALIDA 1230 - Cemento	*/
-- Los materiales (clave y descripción) que han sido proporcionados por el proveedor "Acme tools".

-- Acme tools no existe pero puede cambiar por Oviedo / La Ferre / ...
    SELECT M.clave, M.descripcion
    FROM materiales M, entregan E, proveedores P
    WHERE M.clave = E.clave and E.RFC = P.RFC
    AND P.razonsocial = 'La Ferre';
/*Salida con La Ferre - 12 renglones
1020 Varilla 3/17
1020 Varilla 3/17
*/

-- El RFC de los proveedores que durante el 2000 entregaron en promedio cuando menos 300 materiales.
	SELECT P.RFC
    FROM proveedores P, entregan E
    WHERE P.RFC = E.RFC
    AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31'
    AND E.cantidad > 300;
    
    SELECT RFC
    FROM entregan
    WHERE fecha BETWEEN '2000-01-01' AND '2000-12-31'
    AND cantidad > 300;
/* SALIDA 5 registros
FFFF800101
CCCC800101
*/

-- El Total entregado por cada material en el año 2000.
	SELECT SUM(cantidad)
    FROM entregan
    WHERE fecha BETWEEN '2000-01-01' AND '2000-12-31'
    GROUP BY clave;
    
/* SALIDA 11 registros
8
623
*/
-- La Clave del material más vendido durante el 2001. (se recomienda usar una vista intermedia para su solución)
	SELECT clave, SUM(cantidad) as 'total vendido'
    FROM entregan
    WHERE fecha BETWEEN '2001-01-01' AND '2001-12-31'
    GROUP BY clave 
    ORDER BY sum(cantidad) DESC
	LIMIT 1;

/*SALIDA 1 registro
Clave 1260 | Total vendido 1091
*/
-- Productos que contienen el patrón 'ub' en su nombre.

SELECT *
FROM materiales
WHERE descripcion LIKE '%ub%';

/*SALIDA 12 registros
1180 | Recubrimiento P1001 | 200 | 20
1190 | Recubrimiento P1001 | 220 | 22
*/

-- Denominación y suma del total a pagar para todos los proyectos.
	SELECT P.denominacion, SUM(M.precio) AS 'Total'
    FROM proyectos P
    JOIN entregan E ON P.numero = E.numero 
    JOIN materiales M ON M.clave = E.clave
    group by P.numero;

/*SALIDA 20 registros
Vamos México | 465
Aztecon | 490

*/
/*Denominación, RFC y RazonSocial de los proveedores que se suministran 
materiales al proyecto Televisa en acción que no se encuentran apoyando 
al proyecto Educando en Coahuila (Solo usando vistas).*/

SELECT DISTINCT PY.numero , Py.denominacion, Pv.RFC, Pv.razonsocial
FROM proyectos Py
JOIN entregan E ON Py.numero = E.numero
JOIN proveedores Pv ON E.RFC = PV.RFC
WHERE Py.denominacion = 'Televisa en acción' 
AND Py.denominacion NOT IN ( SELECT Py.denominacion 
							 FROM proyectos PY
							 WHERE PY.denominacion = 'Educando en Coahuila'
						   );

/*SALIDA 5 registros
Televisa en acción | AAAA800101 | La fragua
Televisa en acción | DDDD800101 | Cecoferre
*/
-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que no se encuentran apoyando al proyecto Educando en Coahuila (Sin usar vistas, utiliza not in, in o exists).
SELECT DISTINCT Py.denominacion, Pv.RFC, Pv.razonsocial
FROM proyectos Py
JOIN entregan E ON Py.numero = E.numero
JOIN proveedores Pv ON E.RFC = Pv.RFC
WHERE Py.denominacion = 'Televisa en acción'
AND Pv.RFC NOT IN (
					SELECT DISTINCT Pv.RFC
					FROM proveedores Pv
					  JOIN entregan E ON Pv.RFC = E.RFC
					  JOIN proyectos Py ON E.numero = Py.numero
					  WHERE Py.denominacion = 'Educando en Coahuila'
				  );

/*SALIDA 2 registros
Televisa en acción | CCCC800101 | La Ferre
Televisa en acción | DDDD800101 | Cecoferre
*/
-- Costo de los materiales y los Materiales que son entregados al proyecto Televisa en acción cuyos proveedores también suministran materiales al proyecto Educando en Coahuila.
	SELECT DISTINCT M.precio, M.descripcion
    FROM materiales M
    JOIN entregan E ON M.clave = E.clave
    JOIN proyectos P ON E.numero = P.numero
    JOIN proveedores Pv ON E.RFC = Pv.RFC
    WHERE P.denominacion = 'Televisa en acción'
    AND Pv.RFC IN (
					SELECT Pv.RFC
					FROM proveedores Pv
					JOIN entregan E ON Pv.RFC = E.RFC
					JOIN proyectos P ON E.numero = P.numero
					WHERE P.denominacion = 'Educando en Coahuila'
				   );
/*SALIDA 2 registros
50 | Ladrillos rojos
34 | Tepetate
*/