var express = require('express');
const app=express();
var router=express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const { render } = require('ejs');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    res.render('homepage');
});
router.get('/homepage',(req,res)=>{
    res.render('homepage');
});
router.get('/facilities',(req,res)=>{
    res.render('facilities');
});
router.get('/complaints',(req,res)=>{
    res.render('homepage');
});
router.get('/login',(request,response)=>{
    response.render('login');
});
router.get('/homecomplaints',(request,response)=>{
    response.render('homecomplaints');
});
router.get('/main',(request,response)=>{
    response.render('main');
});
router.get('/inmate',(request,response)=>{
    response.render('inmate');
});
router.get('/addinmate',(request,response)=>{
    response.render('add');
});
router.get('/deleteinmate',(request,response)=>{
    response.render('delete');
});
router.get('/updateinmate',(request,response)=>{
    response.render('update');
});
router.get('/adddeath',(request,response)=>{
    response.render('adddeath');
});
router.get('/addvisitor',(request,response)=>{
    response.render('addvisitor');
});
router.get('/addhandicapped',(request,response)=>{
    response.render('addhandicapped');
});
router.get('/subjail',(request,response)=>{
    response.render('subjail');
});
router.get('/visitor',(request,response)=>{
    response.render('visitor');
});
router.get('/handi',(request,response)=>{
    response.render('handi');
});
router.get('/dead',(request,response)=>{
    response.render('dead');
});
router.get('/addhandi',(request,response)=>{
    response.render('addhandi');
});
router.get('/checkcriminal',(request,response)=>{
    response.render('checkcriminal');
});
router.get('/viewcriminal',(request,response)=>{
    response.render('viewcriminal');
});
router.get('/officer',(request,response)=>{
    response.render('officer');
});
router.get('/addofficer',(request,response)=>{
    response.render('addofficer');
});
router.get('/addwork',(request,response)=>{
    response.render('addwork');
});
router.get('/work',(request,response)=>{
    response.render('work');
});
router.get('/GFG.pdf',(request,response)=>{
    response.render('GFG.pdf');
});
router.get('/cs',(request,response)=>{
    response.render('cs');
});
router.get('/addcrime',(request,response)=>{
    response.render('addcrime');
});
router.post('/login',function(req,res,next) {
    var username = req.body.username;
    var password = req.body.password;
    var police=req.body.police;
    database.query("select * from login where username = ? and password = ? and police=?",[username,password,police],function(error,results,fields){
        if(results.length > 0){ 
            res.render('main');
        }else{ 
           // res.redirect("/");
           res.redirect('/sampledata/login');
        } 
        res.end();
    }) 
});



router.post("/addinmate", function(req,res){   
    var Criminal_id = req.body.Criminal_id;
    var First_Name = req.body.First_Name;
   
    var Age= req.body.Age;
    var Years_of_prison = req.body.Years_of_prison;
    var Subjail_no= req.body.Subjail_no; 
    var Gender= req.body.Gender; 
    var Handicapped=req.body.Handicapped;
   var Crime_id=req.body.Crime_id;
   var eye_color=req.body.eye_color;
   var Marital_status=req.body.Marital_status;
    var sql3="insert into relation_criminal_crime (Crime_id,Criminal_id) values ('"+Crime_id+"','"+Criminal_id+"')";
   database.query(sql3,function(err,results){
    if(err) throw err;
});
    var sql = "insert into criminal(Criminal_id,First_Name,Age,Years_of_prison,Gender,eye_color,Marital_status)  values ('"+Criminal_id+"','"+First_Name+"','"+Age+"','"+Years_of_prison+"','"+Gender+"','"+eye_color+"','"+Marital_status+"')";
    database.query(sql,function(error,results){
        if(error) throw error;
        
    }); 
    var sql2="insert into Subjail(Criminal_id,Subjail_no) values ('"+Criminal_id+"','"+Subjail_no+"')";
    database.query(sql2,function(error,results){
        if(error) throw error;
    });
    
    if(Handicapped=="Yes"){
        database.query("select * from criminal where Criminal_id=?",[Criminal_id],function(error,results){
            var First_Name=results[0].First_Name;
            
            var sql="insert into extrahandi(Criminal_id,first_Name) values ('"+Criminal_id+"','"+First_Name+"')";
             database.query(sql,function(error,results){
                 if(error) throw error;
                }); 
          })
        res.render("addhandicapped"); 
    }else{
        res.render("main");
    }
     
   
}) ;

router.post("/delete", function(req,res){   
    var Criminal_id = req.body.Criminal_id;
    var Reason= req.body.Reason; 
   var Handicapped=req.body.Handicapped;
   database.query("select * from criminal where Criminal_id=?",[Criminal_id],function(error,results){
     var First_Name=results[0].First_Name;
     var Years_of_prison=results[0].Years_of_prison;
     
     var sql="insert into deleteddeath(Criminal_id,first_Name,Years_of_prison) values ('"+Criminal_id+"','"+First_Name+"','"+Years_of_prison+"')";
      database.query(sql,function(error,results){
          if(error) throw error;
         }); 
   })
   
    if(Reason=="Death"){ 
      res.render("adddeath");  
       
   }
    if(Handicapped=="Yes"){
        database.query("Delete from handicapped where Criminal_id=?",[Criminal_id],function(err,results,fields){
            if(err) throw err;
        });
    }  
    database.query("DELETE  FROM Subjail WHERE Criminal_id = ?" ,[Criminal_id],function(err,results,fields){
        if(err) throw err;
       
     });
    database.query("DELETE  FROM criminal WHERE Criminal_id = ?" ,[Criminal_id],function(err,results,fields){
            if(err) throw err;
            res.render("main");
         });
         
 
}) ;

router.post("/adddeath",function(req,res){
    var Death_reason=req.body.Death_reason;
    database.query("select * from deleteddeath",function(error,results){
        var Dead_personname=results[0].first_Name;
        var Years_of_prison=results[0].Years_of_prison;
        
        var sql="insert into death(Dead_personname,Years_of_prison,Death_reason) values ('"+Dead_personname+"','"+Years_of_prison+"','"+Death_reason+"')";
         database.query(sql,function(error,results){
             if(error) throw error;
             
            }); 
      })
      database.query("Delete From deleteddeath where Criminal_id>0",function(error,results){
        if (error) throw error;
        res.render("main");
      });
})
router.post("/complaints",function(req,res){
   res.render("homepage")
})

router.post("/addhandicapped",function(req,res){
    var Afflicted_by=req.body.Afflicted_by;
    database.query("select * from extrahandi",function(error,results){
        var Name=results[0].First_Name;
        var Criminal_id=results[0].Criminal_id;
        var sql="insert into handicapped(Criminal_id,Name,Afflicted_by) values ('"+Criminal_id+"','"+Name+"','"+Afflicted_by+"')";
         database.query(sql,function(error,results){
             if(error) throw error;
             
            }); 
      })
      database.query("Delete From extrahandi where Criminal_id>0",function(error,results){
        if (error) throw error;
        else res.render("main");
      });

})


router.post("/addvisitor", function(req,res){   
    var S_no = req.body.S_no;
    var Full_Name = req.body.Full_Name;
    var Criminal_id = req.body.Criminal_id;
    var Phone_no = req.body.Phone_no;
    var Street= req.body.Street; 
    var City= req.body.City; 
  
   
        var sql = "insert into visitor(Full_Name,Criminal_id,Phone_no,Street,City)  values ('"+Full_Name+"','"+Criminal_id+"','"+Phone_no+"','"+Street+"','"+City+"')";
    
      database.query(sql,function(error,results){
        if(error) throw error;
        res.render("main");
      });
}) ;
router.post("/update", function(req,res){   
    var Criminal_id = req.body.Criminal_id;

    var Subjail_no= req.body.Subjail_no; 
    var sql = "UPDATE subjail  SET Subjail_no=? WHERE Criminal_id=?";
   database.query(sql,[Subjail_no,Criminal_id],function(err,results){
    if(err) throw err;
    res.render("main");
   });

 
}) ;
router.get("/viewvisitor", function(request, response, next){

	var query = "SELECT * FROM visitor";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewvisitor', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.get("/viewtotal", function(request, response, next){

	var query = "SELECT * FROM criminal";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewtotal', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.post("/checkcriminal",function(request,response,next){
    var Criminal_id=request.body.Criminal_id;
    var query="SELECT * FROM criminal inner join subjail on criminal.Criminal_id =subjail.Criminal_id inner join relation_criminal_crime on   criminal.Criminal_id =relation_criminal_crime.Criminal_id inner join crime  on crime.Crime_id=relation_criminal_crime.Crime_id inner join death on criminal.First_Name=death.Dead_personname  where criminal.Criminal_id=?";
    database.query(query,[Criminal_id],function(error,data){
        if(error){
            throw error;
        }else{
            response.render("viewcriminal",{sampleData:data});
        }
    });
});
// router.post("/checkcriminal", function(request, response, next){
//     var Criminal_id=request.body.Criminal_id;

// 	var query = "SELECT * FROM criminal inner join subjail on criminal.Criminal_id =subjail.Criminal_id inner join relation_criminal_crime on   criminal.Criminal_id =relation_criminal_crime.Criminal_id inner join crime  on crime.Crime_id=relation_criminal_crime.Crime_id where criminal.Criminal_id=?";
// 	database.query(query,[Criminal_id], function(error, data){

// 		if(error)
// 		{
// 			throw error; 
// 		}
// 		else
// 		{
// 			response.render('viewcriminal', {sampleData:data});
// 		}

// 	});

// });
router.get("/viewsubjail", function(request, response, next){

	var query = "SELECT * FROM subjail";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewsubjail', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.get("/viewhandi", function(request, response, next){

	var query = "SELECT * FROM handicapped";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewhandi', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.post("/addhandi", function(req,res){   
   
    var Criminal_id = req.body.Criminal_id;
    var Name = req.body.Name;
    var Afflicted_by= req.body.Afflicted_by; 
        var sql = "insert into handicapped(Criminal_id,Name,Afflicted_by)  values ('"+Criminal_id+"','"+Name+"','"+Afflicted_by+"')";
    
      database.query(sql,function(error,results){
        if(error) throw error;
       else  res.render("main");
      });
}) ;

router.get("/viewdeath", function(request, response, next){

	var query = "SELECT * FROM death";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewdeath', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.post("/addofficer", function(req,res){   
   
    var Guard_id = req.body.Guard_id;
    var Guard_Name = req.body.Guard_Name;
    var Salary = req.body.Salary;
    var Age = req.body.Age;
    var Duty_hours = req.body.Duty_hours;
    var Subjail_no = req.body.Subjail_no;
    var Gender= req.body.Gender; 
        var sql = "insert into guard(Guard_id,Guard_Name,Salary,Age,Duty_hours,Subjail_no,Gender)  values ('"+Guard_id+"','"+Guard_Name+"','"+Salary+"','"+Age+"','"+Duty_hours+"', '"+Subjail_no+"','"+Gender+"' )";
    
      database.query(sql,function(error,results){
        if(error) throw error;
        res.render("main");
      });
}) ;
router.get("/viewofficer", function(request, response, next){

	var query = "SELECT * FROM guard";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewofficer', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.post("/addwork", function(req,res){   
   
    var Criminal_name = req.body.Criminal_name;
    var Hours_of_work = req.body.Hours_of_work;
    var Type_ofwork = req.body.Type_ofwork;
    var Amount_earned = req.body.Amount_earned;
   database.query("select First_Name from criminal where First_Name=?",[Criminal_name],function(err,results){
      if(results.length==0){
           throw err;
      }else{
        var sql = "insert into work(Criminal_name,Hours_of_work,Type_ofwork,Amount_earned)  values ('"+Criminal_name+"','"+Hours_of_work+"','"+Type_ofwork+"','"+Amount_earned+"')";
    
        database.query(sql,function(error,results){
          if(error) throw error;
          res.render("main");
        });
      } 
   })
        
}) ;
router.get("/viewwork", function(request, response, next){

	var query = "SELECT * FROM work";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewwork', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});
router.post("/addcrime", function(req,res){   
   
    var Crime_id= req.body.Crime_id;
    var Crime_type = req.body.Crime_type;
    
   
        var sql = "insert into crime(Crime_id,Crime_type)  values ('"+Crime_id+"','"+Crime_type+"')";
    
        database.query(sql,function(error,results){
          if(error) throw error;
          res.render("main");
        });
      
        
}) ;
router.get("/viewcrime", function(request, response, next){

	var query = "SELECT * FROM crime";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('viewcrime', {title:'thank you devuda', action:'list', sampleData:data});
		}

	});

});

module.exports=router;


