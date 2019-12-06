"use strict";

var fs = require("fs");
const fetch = require("node-fetch"); 
let pages = 0;
let i = 0;
let userRep = process.argv[2].substring(19,process.argv[2].length);
let restUrl = `https://api.github.com/repos/${userRep}/issues?page=`;
async function getIssues(a){
    var resp = await fetch(restUrl+a);
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
        getIssues(1).then(function(r){ //getIssues(i).then(function(r){
            if(r.message=='Not Found'){
                console.log(`The repository ${restUrl} do not exists`);
                return;
            }
            if(r.length==0) {
                console.log(`The repository ${restUrl} has no issues`);
                return; //working
            }
            for(var i=0;i<r.length;i++){
                var element = r[i];
                var milestone = element.milestone;
                var assignee = element.assignee; //if false
                if(element.assignee!=null&&'login' in element.assignee){
                    assignee = element.assignee.login; //if true
                }
                if(element.milestone!=null&&'title' in element.assignee){
                    milestone = element.milestone.milestone; //if true
                }
                var data = `"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${assignee}","${element.labels}","${milestone}"\n`;
                fs.appendFile(fileToWrite, data, (err) => {
                    if(err) {
                        console.log(err);
                    }
                    else{
                    }
                });
                //console.log(`"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${element.assign}","${element.labels}","${element.milestone}"`);
            }
            console.log(`Successfully Written Issues from http://github.com/${userRep} to file ${fileToWrite}`);
        });        
    })();
})();
