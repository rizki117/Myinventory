



import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const UserSession = db.define(
  'userSession', 
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refres_token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(UserSession);
UserSession.belongsTo(User, {foreignKey: 'userId'});

//(async()=>{await db.sync()})();


export default UserSession;
