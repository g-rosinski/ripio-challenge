# ripio-challenge
P2P WebComponent Frontend

Web Component el cual permita el envío de fondos crypto entre pares (dos usuarios)

### Consideraciones del Web Component
- Debe recibir el usuario (email) como parametro. Se asume que está autenticado
- Obtiene el balance del usuario por parametro
- Contiene la lista de usuarios disponibles
- Divisas disponibles: BTC, ETH, USDT, DAI

#### Transferencia
- Debe seleccionar divisa, monto y receptor
- El monto no debe superar el balance del emisor
- El balance del usuario es parametrizable
- Cada divisa tiene su balance disponible
- Las transferencias mayor a 1000 quedarán en estado pendiente.
- Las transferencias menor a 1000 quedarán en estado compleatdo.

#### Flujo de pantallas
1. Pantalla de envio(/p2p/transferencia): Ingreso de receptor, criptodivisa y monto
2. Pantalla de ingreso de OTP(/p2p/transferencia/confirmar): Ingreso token de 6 dígitos one-time-password
3. Pantalla de exito(/p2p/transferencia/exitosa): Visualiza emisor/receptor, la criptodivisa enviada y el monto, así como la fecha de la transacción y un status (completada o pendiente)

### Como utilizar el componente

#### 1.  Levantar el proyecto

1. La primera vez es necesario instalar las dependencias para compilar el proyecto.
```
npm run install
```

2. Compilar el proyecto. Una vez finalizado se generará la carpeta /build con el bundle de la aplicación.
```
npm run build
```

3. Por último, correr serve para disponibilizar el bundle para que se consuma desde cualquier proyecto.
```
npm run serve
```
Ahora tendras disponible una dirección(http://localhost:3010) para consumir el componente.

**URL del componente: http://localhost:3010/p2p.js**

#### 2. Incorporar componente

A continuación un ejemplo simple para usar el componente.

Ejemplo:
```html
<html lang="es">
  <head>
    <!-- Agregar el bundle del componente -->
    <script src="http://localhost:3010/p2p.js"></script>
  </head>
  <body>
    <!-- DOM Element donde necesito que se reenderice el componente -->
    <div id="root"></div>
    <!-- Script plano para renderizar el componente -->
    <script>
      window['mountApp']('root', {
        user: "emiliano.martinez@gmail.com"
      })
    </script>
  </body>
</html>
```
* Se debe consumir el bundle, en el ejemplo se agrega:  `<script src="http://localhost:3010/p2p.js"></script>`
* Al incoporar el bundle, a travez de window['mountApp'] se disponibiliza una función que permite renderizar el componente. Se le debe pasar como argumento el id de un elemento HTML donde se va a renderizar el componente y los parametros iniciales del componente.
`window['mountApp'] = (elementID:string, params: AppParams) => void`

#### 3. API del componente

### `window['mountApp'](elementID, params)`
Monta el componente. 
**Importante**: Se renderiza la pantalla de transferencia cuando se ingresa a la ruta de la pantalla de envio: */p2p/transferencia*
+ `elementID` <abbr>string</abbr> : ID del elemento donde se quiere renderizar el componente   
+ `params` <abbr>AppParams</abbr> : Parametros del componente como objetct `{}`
```
{
	user:  "emiliano.martinez@gmail.com" // email del usuario logueado, emisor de las transferencias.
}
```

### `window['unmountApp'](elementID)`
Desmonta el componente
+ `elementID` <abbr>string</abbr> : ID del elemento donde se encuentra montado el componente.

## Desarrollo

Instalar las dependencias necesarias para el desarrollo.
```
npm run install
```
Levantar el proyeto.:
```
npm run start
```
Abrir [http://localhost:3010](http://localhost:3010) para ver el proyecto en el navegador.

Luego de cada desarrollo correr los tests unitarios del proyecto con el siguiente script:
```
npm run test
```