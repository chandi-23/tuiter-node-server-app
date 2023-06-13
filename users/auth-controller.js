import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
//const register = (req, res) => { };
//const login    = (req, res) => { };
//const profile  = (req, res) => { };
//const logout   = (req, res) => { };
 const update   = (req, res) => { 
    //console.log("updating the first and the last name")
    const user = req.body
    const username = req.body.username;
    //console.log(req.body)
    const curr_user = usersDao.findUserByUsername(username);
    if(curr_user){
        usersDao.updateUser(req.body._id, user)
    }
    res.json(user)
 };

const register = (req, res) => {
    //console.log("In Register")
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    //console.log(newUser)
    
    res.json(newUser);
  };

const login = (req, res) => {
    //console.log("in the login")
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };
 
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };


  const logout = async (req, res) => {
    //console.log("destroying session")
    req.session.destroy();
    res.sendStatus(200);
  };
 

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
};
export default AuthController;