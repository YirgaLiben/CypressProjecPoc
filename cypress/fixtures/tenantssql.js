var mysql = require('mysql');

var con = mysql.createConnection({
  host: '16.103.234.203', 
  user: "sa",
  password: "SPI!password",
  database: "ZEUS"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT top 10 * FROM TenantMaster", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

