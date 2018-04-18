import {Router, Request, Response , NextFunction} from 'express';
import User from '../models/userModel';


class UserRouter {

   public router: Router;

   constructor() {
       this.router = Router();
       this.routes();

   }
   public getUsers(req:Request,res:Response, next:NextFunction) {

        User.find()
         .then((users:any) => {
             if(users) {
                let statusCode = res.statusCode;
                res.json({
                    statusCode,
                    users
                })
             }
         });
   }

   public addUsers(req:Request,res:Response, next:NextFunction) {
        
        var name = req.body.name,
            email = req.body.email,
            password = req.body.password;

        let newUser = new User({
            name,
            email,
            password
        })

        newUser.save()
          .then((user:Object) => {
             if(user) {
                let statusCode = res.statusCode;
                res.json({
                    statusCode,
                    user
                })
             }
          })
    }
    public editUsers(req:Request,res:Response,next:NextFunction) {

      var id = req.params.id;
      var updated_data:any = {};

        Object.entries(req.body).forEach(([key, value]) => {
            updated_data[key] = value;
        })

        User.findOneAndUpdate({_id:id},{ $set: updated_data },{new:true})
          .then((user:any) => {
             if(user) {
                let statusCode = res.statusCode;
                res.json({
                    statusCode,
                    user
                })
             }
          });
    }

    public deleteUsers(req:Request,res:Response, next:NextFunction) {
        var id = req.params.id;

        User.findOneAndRemove({_id:id})
          .then((user:any) => {
             if(user) {
                let statusCode = res.statusCode;
                res.json({
                    statusCode,
                    user
                })
             }
          })
    }

   public routes() {
       this.router.get('/',this.getUsers);
       this.router.post('/',this.addUsers)
       this.router.put('/:id',this.editUsers)
       this.router.delete('/:id',this.deleteUsers)
   }
}

const userRoutes = new UserRouter();

userRoutes.routes;

export default new  UserRouter().router;