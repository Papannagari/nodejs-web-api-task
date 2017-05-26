var express = require("express");

var app = express()

var router = express.Router();

var mongoose = require("mongoose");

var Employee = require("./models/employee");

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/techera2",function(){
	console.log("successfully connected  to dabase")
})


router.get("/getemployeeinfo",function(request,response){
Employee.getEmployeeData(function(err,employeeData){
		 if(err){
              throw err;
		  }
		  response.json(employeeData);
})
})

router.post("/insertemployee",function(request,response){
	var empObj = request.body;
	Employee.insertEmployee(empObj,function(err,data){
		 if(err){
		              throw err;
				  }
				  response.json(data);
	})
})

router.delete("/deleteemloyee/:id",function(request,response){
	var userId = request.params.id;

	Employee.deleteEmployee(userId,function(err,data){
         if(err){
		              throw err;
				  }
				  response.json(data);
	})
})
router.get("/employeebyid/:id",function(request,response){
var userId = request.params.id;
Employee.getEmployeeById(userId,function(err,customerData){
		 if(err){
              throw err;
		  }
		  response.json(customerData);
})
})

router.put("/editemployee/:id",function(request,response){

	var userId = request.params.id;
	var dataFromPostMan = request.body;
	//var newObj = {};
	console.log(userId)
		Employee.getEmployeeById(userId,function(err,dataFromDB){
				 if(err){
		              throw err;
				  }
				  
				var bodyObj = {
					eid : dataFromPostMan.eid || dataFromDB.eid,
					ename : dataFromPostMan.ename || dataFromDB.ename,
					DOJ : dataFromPostMan.DOJ || dataFromDB.DOJ,
					esal : dataFromPostMan.esal || dataFromDB.esal,
					pin : dataFromPostMan.pin || dataFromDB.address.pin,
					state : dataFromPostMan.state || dataFromDB.address.state,
					hno : dataFromPostMan.hno || dataFromDB.address.hno

				}
				Employee.editEmployee(userId,bodyObj,function(err,data){
                  if(err){
		              throw err;
				  }
				  response.json(data);
	})
		});


	

})

app.use("/api",router);

var PORT = process.env.PORT || 2014;
app.listen(PORT,function(){
	console.log("server listening at port  "+PORT)
})