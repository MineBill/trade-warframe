import { DataTypes } from "sequelize"

/**
    * @returns A function that defines the User model
*/
export default (sequelize) => {
    return sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        password_hash: {
            allowNull: false,
            type: DataTypes.STRING(60),
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        }
    });
}
