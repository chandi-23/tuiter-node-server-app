import usersModel from "./users-model.js";
//let users = [];
import { ObjectId } from 'mongodb';

export const findAllUsers = () => usersModel.find();


export const findUserById = (uid) => {
    return usersModel.findById(id);
    //check for index return values:
 const index = users.findIndex((u) => u._id === uid);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByUsername = (username) => {
    return usersModel.findOne({ username });
    //old-code
    const index = users.findIndex((u) => u.username === username);
 //console.log("findUserByUsername")
 
 //console.log(index)
 //console.log(u.username)
 if (index !== -1) {return users[index];}

 return null;
};


export const findUserByCredentials = (username, password) => {
 return usersModel.findOne({ username, password });
    //console.log(users)
 const index = users.findIndex((u) => u.username === username && u.password === password);
 if (index !== -1) return users[index];
 return null;
};


export const createUser = (user) => {return usersModel.create(user);}


export const updateUser = (uid, user) => {
    
    //console.log("UID", uid)
    //console.log("In the update user", user.username)
    //usersModel.updateOne({ username: user.username }, { $set: {firstname:user.firstname, lastname:user.lastname} });
    usersModel.updateOne({_id: new ObjectId(uid)},{$set:user}).then(result => {
        // Handle the result
        console.log(result);
        })
    //console.log(resp);
    return {status: 'ok'}
    //old-code
    //console.log("updating the user")

 const index = users.findIndex((u) => u._id === uid);
 //console.log(index)
 //console.log(users[index])
 //console.log(user)
 
 users[index] = { ...users[index], ...user };
 //console.log("after updating")
 //console.log(users[index])
 return {status: 'ok'}
};


export const deleteUser = (uid) => {
    usersModel.deleteOne({ _id: id });
    return {status: 'ok'}
    //old-code
 const index = users.findIndex((u) => u._id === uid);
 users.splice(index, 1);
 return {status: 'ok'}
};