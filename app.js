import inquirer from 'inquirer'
import express from 'express'
const app=express()
import fs from 'fs'
let data1=fs.readFileSync('./index.html','utf-8')
let data2=fs.readFileSync('./hava.html','utf-8')

app.get('/',async function(req,res){
    res.end(data1)
    
})
app.get('/salamla',async(req,res)=>{
   
   console.log(req.query.seher)
   
    async function weather (city){
     const cavab= await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=13ca0c89d8cd04873921fbc32a542965&units=metric')
    if(cavab.status!==200){
        return 
    }
    const data=await cavab.json()
     return data.weather[0].description+' '+data.main.temp +' '+data.wind.speed
     

    }
    let x=await weather(req.query.seher)
   x=x.split(' ')
   console.log(x)
   let y=x.filter(item=>{
    return item!==x[x.length-1] && item!==x[x.length-2]
   }).join(' ')
   
   data2=data2.replace(/{{hava}}/g,y)
   data2=data2.replace(/{{temp}}/g,x[x.length-2])
   data2=data2.replace(/{{külək}}/g,x[x.length-1])
   res.end(data2)
 
 }

)

     
app.listen(10542,async(req,res)=>{
    console.log("Server ishe dushdu")
})









// async function weather(city){
//     const cavab= await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=13ca0c89d8cd04873921fbc32a542965&units=metric')
// if(cavab.status!==200){
//     return
// }
// const data=await cavab.json()
// console.log(data.weather[0].description)
// console.log(data.main.temp)


// }
// const prompt=inquirer.createPromptModule()
// prompt([{
//     message:'Seherin adini daxil edin',
//     type:'input',
//     name:'seher'
// }]).then(netice=>{
//     weather(netice.seher)
// })