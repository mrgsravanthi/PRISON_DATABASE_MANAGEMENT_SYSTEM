const mysql=require('mysql');
var connection=mysql.createConnection({
    host: 'localhost',
    database: 'criminaldb',
    user: 'root',
    password: 'sra1thi@iiti'
});
connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('database succesfully connected');
    }
});

module.exports=connection;