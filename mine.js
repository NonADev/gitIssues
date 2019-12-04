"use strict";
const user = "apache";
const repository = "cordova-android";
const fetch = require("node-fetch"); 
let restUrl = `https://api.github.com/repos/${user}/${repository}/issues?page=`;
async function getIssues(a){
    const resp = await fetch(restUrl+a);
    console.log(restUrl+a);
    resp.apiPage = a;
    return resp.json();
}
getIssues(112321).then(function(r){
    console.log(r);
    if(r.length==0) return; //working
    for(var i=0;i<r.length;i++){
        var element = r[i];
        //console.log(`"${element.title.replace(/(\r\n|\n|\r)/gm,"")}","${element.body.replace(/(\r\n|\n|\r)/gm,"")}","${element.state.replace(/(\r\n|\n|\r)/gm,"")}","${element.number}","${element.assign}","${element.labels}","${element.milestone}"\n`);
    }
});
