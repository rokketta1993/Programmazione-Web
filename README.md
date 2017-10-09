Questo file di readme, è stato scritto utilizzando il linguaggio [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)

# Studente:
Mattia Rocco    090376

# NodeJs_Home-Banking_esempio
Esempio di sito in Node.js, con: 
- autenticazione JWT
- Studio3T per gli schemi DB
- organizzazione route divisa in diversi Router di Express


# Client di Riferimento
- [link al repo](https://github.com/rokketta1993/Programmazione-Web)



# Traccia
1. Homebanking: 
   - come utente voglio poter accedere ad un’area privata tramite username e password
   - come utente voglio poter leggere i miei movimenti bancari
   - come utente voglio poter stampare un report dei miei movimenti bancari
   - come utente voglio poter effettuare un bonifico
   - come utente voglio poter avere un grafico che mi illustra in maniera sintetica la mia situazione in banca
   



# API esposte dal server:

/     
GET   /  
POST  /

/user    
GET   /users/index  
GET   /users/register  
GET   /users/login  
GET   /users/logout  
GET   /users/pay  
GET   /users/show  
GET   /users/grafico  

POST  /users/register  
POST  /users/login  
POST  /users/pay  



Le API rispondo con un messaggio strutturato nel seguente modo
- caso di successo
`{success: true, message: 'operazione completata',  data: {'token':'494jti4944'}}`
- caso di errore
`{ success: false, code: 'ERR_API_WRONG_PSW', message: 'autenticazione fallita' }`



# Codici restituiti dal server
- server attivo sulla porta 5000 - il server si avvia su localhost:5000
- Pagamento effettuato - dopo aver completato il form riguardante il pagamento




# Struttura file del server
```

--- favicon.ico           //icona dell'homepage
--- app.js                //file principale da eseguire
--- package.json
--+ views                 //pagine
  |--+ layouts
     |----layout.handlebars
  |----grafico.handlebars
  |----index.handlebars
  |----login.handlebars
  |----mostrapag.handlebars
  |----pagamento.handlebars
  |----register.handlebars
	
--+ routes
  |---- index.js      //funzioni autenticazione 
  |---- users.js      //funzioni per interagire con il db
 
--+ public                //file parte grafica
  |--+ css
  |--+ fonts
  |--+ js

--+ models                   //schemi modelli Mongoose
  |--- user.js
```

Prima di avviare il server, installare le dipendenze con il comando  
`npm install`

poi avviarlo con il comando  
`npm start`

oppure installate [https://github.com/foreverjs/forever](forever), per riavviare in automatico Node dopo una modifica, o dopo un crash. (-w sta per watch, cioè controlla se sono state salvate modifiche)  
`forever -w start index.js`



# Tutorial di riferimento Scotch.io
- [JWT e Node](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
- [Mongoose e Node](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
- [Organizzare le route](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)

