# Studente:
Mattia Rocco    090376

## NodeJs_Home-Banking_esempio
Esempio di sito in Node.js, con: 
- autenticazione Username e Password
- Studio3T per gli schemi DB collegato con mLab
- organizzazione route divisa in diversi Router di Express


## Client di Riferimento
- [link al repo GitHub](https://github.com/rokketta1993/Programmazione-Web)
- [link all'App Heroku](https://homebanking-app.herokuapp.com/)
- [link YouTube](https://youtu.be/0eB20c866n0)



## Traccia
1. Homebanking: 
   - come utente voglio poter accedere ad un’area privata tramite username e password
   - come utente voglio poter leggere i miei movimenti bancari
   - come utente voglio poter stampare un report dei miei movimenti bancari
   - come utente voglio poter effettuare un bonifico
   - come utente voglio poter avere un grafico che mi illustra in maniera sintetica la mia situazione in banca
   



## API esposte dal server:

/     
GET   /  
POST  /

/user    
GET   /users/index  
GET   /users/home    
GET   /users/register  
GET   /users/login  
GET   /users/logout  
GET   /users/pay  
GET   /users/show  
GET   /users/grafico  

POST  /users/register  
POST  /users/login  
POST  /users/pay  







## Codici restituiti dal server
- Server attivo su: http://localhost:5000 - il server si avvia su localhost:5000
- Dati registrazione nuovo utente
- Pagamento effettuato - dopo aver completato il form riguardante il pagamento




## Struttura file del server
```

--- README.md
--- Procfile              //avvio per Heroku
--- package.json
--- app.js                //file principale da eseguire
--+ views                 //pagine
  |--+ layouts
     |----layout.hbs
  |----grafico.hbs
  |----home.hbs
  |----index.hbs
  |----login.hbs
  |----mostrapag.hbs
  |----pagamento.hbs
  |----register.hbs
	
--+ routes
  |---- index.js      //funzioni autenticazione 
  |---- users.js      //funzioni per interagire con il db
 
--+ public                //file parte grafica
  |--+ css
  |--+ js
  
--+ node_modules          //librerie

--+ models                   //schemi modelli Mongoose
  |--- user.js
```

Prima di avviare il server, installare le dipendenze con il comando  
`npm install`

poi avviarlo con il comando  
`npm start`

oppure installate [FOREVER](https://github.com/foreverjs/forever), per riavviare in automatico Node dopo una modifica, o dopo un crash. (-w sta per watch, cioè controlla se sono state salvate modifiche)  
`forever -w start index.js`



## Documenti 

- [INTRODUZIONE](https://drive.google.com/file/d/0B3kcv5P3VjYRWkl3NHlCZXI5VVU/view?usp=sharing)
- [PRESENTAZIONE](https://drive.google.com/file/d/0B3kcv5P3VjYRS0dyRXZLUVF5eFk/view?usp=sharing)
- [WIREFRAME](https://drive.google.com/file/d/0B3kcv5P3VjYRaVRpNTdGOTdNVmM/view?usp=sharing)

## Tutorial di riferimento Scotch.io
- [JWT e Node](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
- [Mongoose e Node](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
- [Organizzare le route](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)

***

Questo file di README è stato scritto utilizzando il linguaggio [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)
