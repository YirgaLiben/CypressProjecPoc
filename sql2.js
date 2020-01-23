var sql = require('mssql');

var dbconfig = {

    server: "16.103.234.203",
    user: "sa",
    password: "SPI!password",
    database: "ZEUS",
    port: 1433,

    options: {
        encrypt: false
    }

};

function getTenantsID() {

    var conn = new sql.ConnectionPool(dbconfig);
    conn.connect(function (err) {
        if (err) throw err;
        var req = new sql.Request(conn);
        req.query("select TenantID from TenantMaster where TenantName = 'AUTO-TENANT1-1575655166707'", function (err, result) {
            if (err) throw err;
            else
			    console.log(result.recordset);
		
            conn.close();
        });
    });
	
	

}

getTenantsID()