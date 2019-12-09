# GitIssues
GitIssues é uma aplicação em node para aquisição de issues de projetos na plataforma GitHub, por meio de sua API rest v3, e salva-los em um arquivo csv (comma separated values).
# Requisitos
Para conseguir usar, é necessário ter instalado: 
* node.js.
# Como usar
Para usar, basta clonar o programa, e na pasta executar o comando `node mine.js <REPOSITORY>`, sendo o REPOSITORY, o link do repositório a se adquirir as issues (devendo haver em seu inicio o protocolo `https://`), após a execução do comando, o arquivo será salvo na pasta com a nomenclatura `./<USER>_<REPOSITORY>.csv`.<br/>
# Exemplo
Executar o comando `node mine.js https://github.com/apache/cordova-android` resulta em um arquivo chamado `apache_cordova-android.csv`.
