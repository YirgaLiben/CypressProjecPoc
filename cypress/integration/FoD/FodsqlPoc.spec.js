// var cypressSqlServer = require("cypress-sql-server")
// var sql = require('mssql')

 describe('sql poc',()=>{

   it('test sql connection',()=>{
     

    cy.task('test')
 // cy.sqlServer('select TenantId  from [ZEUS].[dbo].[TenantMaster] where TenantName = "AUTO-TENANT1-1572627724211"')
   })

  })
  var objConnection = new ActiveXObject("adodb.connection");
  var strConn = "driver={sql server};server=16.103.234.203;database=ZEUS;uid=sa;password=SPI!password'";
  
objConnection.Open(strConn);
var rs = new ActiveXObject("ADODB.Recordset");
var strQuery = "SELECT * FROM users WHERE username = 'user1'";
rs.Open(strQuery,objConnection);

// //       // config for your database
      
// // var config = {
// //   user: 'sa',
// //   password: 'SPI!password',
// //   server: '16.103.234.203', 
// //   database: 'ZEUS' 
// // };

// // // connect to your database
// // sql.connect(config, function (err){ 

// //   if (err) 
// //   cy.log(err);

// //   // create Request object
// //   var request = new sql.Request();

// //   // query to the database and get the records
// //   request.query('SELECT top 10 * FROM TenantMaster', function (err, recordset) {

// //       if (err) 
// //       cy.log(err)

// //       // send records as a response
// //       cy.log(Response)
// //   });
// // })
// //     })

// //     Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true
// const sql = require('mssql')
 
// async () => {
//     try {
//         await sql.connect('Server=16.103.234.203,1433;Database=database;User Id=sa;Password=SPI!password;Encrypt=true')
//         const result = await sq.query().query`SELECT top 10 * FROM TenantMaster`
//         cy.log(result)
//     } catch (err) {
//         // ... error checks
//     }
// }

// })

// })

//var mysql = require('mysql');

// var con = mysql.createConnection({
//   server: '16.103.234.203', 
//   user: "sa",
//   password: "SPI!password'",
//   database: "ZEUS"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT top 10 * FROM TenantMaster", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

//    })

