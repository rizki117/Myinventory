



import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const{DataTypes}= Sequelize;

const User= db.define('user',{
uuid:{
 type:DataTypes.STRING,
 defaultValue:DataTypes.UUIDV4   
},

 name:{
type:DataTypes.STRING   
 }, 
  
 
email:{
type:DataTypes.STRING   
 },
 
password:{
type:DataTypes.STRING   
 },
 
nohp:{
type:DataTypes.INTEGER  
 }, 

role:{
type:DataTypes.STRING   
 }
 
 
},{
 freezeTableName:true
});

//(async()=>{await db.sync()})();

export default User;
