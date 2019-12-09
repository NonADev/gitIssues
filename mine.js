"use strict";
var fs = require("fs");
const fetch = require("node-fetch"); 
if(process.argv.length<3){ //tratamento de parametro : tem que ter parametros 3
    console.log('Aplication usage example: \nnode mine.js https://github.com/apache/cordova-android');
    return;
}
if(process.argv[2].charAt(process.argv[2].length-1)=='/'){ //tratamento de last char : tem que terminar diferente de '/'
    console.log('Be aware of the last character, have to be a letter or a number');
    process.argv[2] = process.argv[2].substring(0,process.argv[2].length-1);
}
let userRep = process.argv[2].substring(19,process.argv[2].length); //getUrlBy parameter
let restUrl = `https://api.github.com/repos/${userRep}/issues?page=1&per_page=100`; //use url parameter to get the api rest link
if(process.argv[2].substr(0,19)!="https://github.com/"){ //tratamento de 3 parametros que tem que ter o https ao invez de n ter ou ser http
    if(process.argv[2].substr(0,5)!="https"){
        console.log('The link sent has to be using the "https" protocol. \nExample: https://github.com/apache/cordova-android');
    }
    else if(process.argv[2].substr(8,11)!="github.com/"){
        console.log('The site is wrong (correct = github.com), or is in other Encoding different than UTF-8');
    }
    return;
}
async function getIssues(){
    var resp = await fetch(restUrl);
    //console.log(restUrl+a);
    return resp.json();
}
let fileToWrite = `./${userRep.replace("/","_")}.csv`;
(function(){
    fs.writeFile(fileToWrite, "", (err) => {
        if(err) {
            console.log(err);
        }
    });
    (async function(){ 
        getIssues().then(function(r){ //getIssues(i).then(function(r){
            if(r.message=='Not Found'){
                console.log(`The repository ${process.argv[2]} do not exists`);
                return;
            }
            if(r.length==0) {
                console.log(`The repository ${process.argv[2]} has no issues`);
                return; //working
            }
            for(var i=0;i<r.length;i++){
                var element = r[i];
                var milestone = element.milestone;
                var assignee = element.assignee; //if false
                if(element.assignee!=null&&'login' in element.assignee){
                    assignee = element.assignee.login; //if true
                }
                if(element.milestone!=null && 'title' in element.milestone){
                    milestone = element.milestone.milestone; //if true
                }
                var data = `"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, "'")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${assignee}","${JSON.stringify(element.labels).replace(/"/g, "'")}","${milestone}"\n`;
                fs.appendFile(fileToWrite, data, (err) => {
                    if(err) {
                        console.log(err);
                    }
                    else{

                    }
                });
            }
            console.log(`Successfully Written Issues from http://github.com/${userRep} to file ${fileToWrite}`);
        });        
    })();
})();
