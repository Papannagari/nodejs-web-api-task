var mongoose = require("mongoose");

var employeeSchema = mongoose.Schema({
	eid : {
		type : Number,
		required :true
	},
	 ename: {
        type : String,
		required :true
	},
	
	DOJ : {
        type : Date,
		required :true
	},
	esal : {
        type : String,
		required :true
	},
	address : {
		        type : Object,
				hno : {
		        type : String,
				required :true
			    },
				state : {
			        type : String,
					required :true
				},
				pin : {
			        type : Number,
					required :true
				}


	}
	
});

var Employee = module.exports = mongoose.model("employee",employeeSchema,"emptable")
module.exports.getEmployeeData = function(callback){
 	return Employee.find(callback)
 }

  module.exports.insertEmployee = function(empObj,callback){
 	return Employee.create(empObj,callback);
 }

 module.exports.deleteEmployee = function(userId,callback){
 	return Employee.remove({_id:userId},callback);
 }
 module.exports.getEmployeeById = function(userId,callback){
 	return Employee.findById({_id:userId},callback)
 }

 module.exports.editEmployee = function(userId,employeeObj,callback){
  return Employee.update({_id:userId},
                         {$set :{
                         	eid: employeeObj.eid,
                         	ename :employeeObj.ename,
                         	DOJ :employeeObj.DOJ,
                         	esal :employeeObj.esal,
                         	address:{
                         	pin :employeeObj.pin,
                         	state :employeeObj.state,
                         	hno :employeeObj.hno
                         	}
                         	
                         }},callback)

}