const movieController=require("../controller/movie_controller");
const userController=require("../controller/user_controller");
const express=require("express")
const router=express.Router();
const auth=require("../middleware/authconfig");

//movie controller
router.post("/createMovie",movieController.createMovie);
router.get("/findMovie",movieController.findmovie);
router.get("/movieList",movieController.findAll);
router.post("/deletemovie",auth,movieController.deleteMovie);
router.post("/updateMovie",auth,movieController.updateMovie);

//user controller
router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/logout",userController.logout);

module.exports=router;