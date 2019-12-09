# GitIssues
GitIssues é uma aplicação em node para aquisição de issues de projetos na plataforma github, por meio de sua API rest v3, e salva-los em um arquivo csv.
# Requisitos
Para conseguir usar, é nescessário ter instalado: 
* node.js.
# Como usar
Para usar, basta baixar o programa, e na pasta executar o comando `node mine.js <REPOSITORY>`, sendo o repository, o link do repositorio a se adquirir as issues, após a execução do comando, o arquivo será salvo na pasta com a nomeclatura `./<USER>_<REPOSITORY>.csv`.<br/>
# Exemplo
Executar o comando `node mine.js https://github.com/apache/cordova-android` resulta em um arquivo chamado `apache_cordova-android.csv`.
