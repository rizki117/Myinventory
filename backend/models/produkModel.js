import {Sequelize} from "sequelize";
import db from "../config/Database.js";

import User from "./userModel.js";

const{DataTypes}= Sequelize;

const Produk= db.define('produk',{
uuid:{
 type:DataTypes.STRING,
 defaultValue:DataTypes.UUIDV4   
},

 name:{
type:DataTypes.STRING   
 }, 
  
 
price:{
type:DataTypes.STRING   
 },
 
description:{
type:DataTypes.STRING   
 }, 
 
harga:{
type:DataTypes.STRING   
 }, 
 
 
userId:{
type:DataTypes.INTEGER  
 }
  
 
 
},{
 freezeTableName:true
});


User.hasMany(Produk);
Produk.belongsTo(User, {foreignKey: 'userId'});

//(async()=>{await db.sync()})();

export default Produk;
