"use strict";
const user = "apache";
const repository = "cordova-android";
const fetch = require("node-fetch"); 
let pages = 0;
let restUrl = `https://api.github.com/repos/${user}/${repository}/issues?page=`;
let i = 0;
async function getIssues(a){
    var resp = await fetch(restUrl+a);
    console.log(restUrl+a);
    return resp.json();
}
(function(){
    (async function(){ 
        var link = `https://api.github.com/search/issues?q=repo:${user}/${repository}+type:issue&per_page=1`;
        var resp = await fetch(link);
        return resp.json();
    })().then(function(r){
        //console.log(Math.ceil(r.total_count/30));
        pages = Math.ceil(r.total_count/30);
        for(i=1;i<=pages;i++){
            getIssues(i).then(function(r){
                if(r.length==0) {
                    return; //working
                }
                for(var i=0;i<r.length;i++){
                    var element = r[i];
                    console.log(`"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${element.assign}","${element.labels}","${element.milestone}"`);
                }
            });
        }
    });

})();
