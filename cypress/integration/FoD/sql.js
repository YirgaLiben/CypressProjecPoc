var express = require('express')
const sql = require('mssql')

var app = express();

app.set('view engine','ejs')

const dbConnectionString  = 'mssql//sa:SPI!password@16.103.234.203:1433/ZEUS'

sql.on('error', err =>{
    console.dir(err);
    sql.close();
});

app.get("/",function(req,res)
{
    sql.connect(dbConnectionString).then(pool =>{
        return pool.request()
        .query('SELECT top 10 * FROM TenantMaster;');
    }).then(result =>{
        sql.close();
        res.render("data", { model:result.recoredset});
    }).catch(err =>{
        console.dir(err);
        sql.close();
    });
})

app.listen("4504",function(){
    console.log("node server listtening at port : 4502");
})

  
