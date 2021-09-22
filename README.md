 <h1 align="center">MODULE-2-PART-4-mongo</h1>
   <h2 align="center">Александр Калиниченко</h2> 
<hr />
<h2> Description</h2>
  <p style="text-indent: 25px;">Сервер работает с облачной БД mongodb. Точкой входа является index.ts. 
Сначала устанавливается коннект к бд, если подключение успешно, то запускается сервер на порту 5400. </p>


<h3>Запуск проекта</h3>
   <p style="text-indent: 25px;"> Выполнить команду npm install в папках FullProject, server, client</p>
   <p style="text-indent: 25px;"> В файле server/config/default.json  найти свойство ClientPath и изменить абсолютный путь на свой  к папке клиент</p>
   <p style="text-indent: 25px;"> В корне проекта(dir name FullProject) в терминале написать команду tsc </p>
   <p style="text-indent: 25px;">Запустить файл index.js в папке server. nodemon index.js</p>
<p> Если обратиться к адресу http://localhost:5400/ будет получен index.html</p>
   <p style="text-indent: 25px;">Доступ к swagger http://localhost:5400/api-docs/</p>
<br/>

