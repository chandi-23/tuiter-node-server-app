let users = [];


export const findAllUsers = () => users;


export const findUserById = (uid) => {
 const index = users.findIndex((u) => u._id === uid);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByUsername = (username) => {
 const index = users.findIndex((u) => u.username === username);
 //console.log("findUserByUsername")
 
 //console.log(index)
 //console.log(u.username)
 if (index !== -1) {return users[index];}

 return null;
};


export const findUserByCredentials = (username, password) => {
 //console.log(users)
 const index = users.findIndex((u) => u.username === username && u.password === password);
 if (index !== -1) return users[index];
 return null;
};


export const createUser = (user) => {users.push(user);return user}


export const updateUser = (uid, user) => {
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
 const index = users.findIndex((u) => u._id === uid);
 users.splice(index, 1);
 return {status: 'ok'}
};

