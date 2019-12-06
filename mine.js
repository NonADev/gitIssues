"use strict";

var fs = require("fs");
const user = "apache";
const repository = "cordova-android";
const fetch = require("node-fetch"); 
let pages = 0;
let i = 0;
let userRep = process.argv[2].substring(19,process.argv[2].length);
let restUrl = `https://api.github.com/repos/${userRep}/issues?page=`;

async function getIssues(a){
    var resp = await fetch(restUrl+a);
    console.log(restUrl+a);
    return resp.json();
}
(function(){
    fs.writeFile(`./${user}_${repository}.csv`, "", (err) => {
        if(err) {
            console.log(err);
        }
    });
    (async function(){ 
        var link = `https://api.github.com/search/issues?q=repo:${user}/${repository}+type:issue+state:open&per_page=1`;
        var resp = await fetch(link);
        return resp.json();
    })().then(function(r){
        getIssues(1).then(function(r){ //getIssues(i).then(function(r){
            if(r.length==0) {
                console.log(`The repository ${restUrl} has no issues`);
                return; //working
            }
            for(var i=0;i<r.length;i++){
                var element = r[i];
                var data = `"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${element.assign}","${element.labels}","${element.milestone}"\n`;
                
                fs.appendFile(`./${user}_${repository}.csv`, data, (err) => {
                    if(err) {
                        console.log(err);
                    }
                    else{
                        //console.log("Successfully Written to File. :"+data);
                    }
                });
                //console.log(`"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${element.assign}","${element.labels}","${element.milestone}"`);
            }
        });
    });
})();
