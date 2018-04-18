//type check

import  express, { NextFunction } from 'express';
import Logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//iport Router

import UserRouter from './router/userRouter';

class App {
    
  public app : express.Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {

    this.app.use(Logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended :true}));
   
    const port = 4000,
          uri = 'mongodb://dbuser:dbpassword@host:port/dbname';    
       
    //connect ti mLab mongodb 

    mongoose.connect(uri).then(
        () => { console.log("Connected Successfully") },
        err => { console.log(err) }
      );
    
    this.app.listen(port, (err:any) => {
        if(err){
           console.log("err",err)
        } else {
            console.log(`Server is listing on port ${port}`);
        }
    });
  }

  public routes(){
    
     let router: express.Router;

      router = express.Router();

      router.get("/",(req:express.Request,res:express.Response) => {
           let code = res.statusCode;
           res.json({
               code,
               message:"Welcome Test REST-API using Express and TypeScript"
           })
       });
 
      this.app.use(router);
      this.app.use('/api/users', UserRouter);

 // catch 404 and forward to error handler
    this.app.use(function(req:express.Request,res:express.Response, next:NextFunction) {
        throw new Error("No matching Route..!!")
    });

 // error handler 
 // define as the last app.use callback
    this.app.use(function(err:any,req:express.Request,res:express.Response, next:NextFunction) {
        let statusCode = 404 ;
        res.status(statusCode).json({
            statusCode,
            message:err.message
        });
    });
  }
    
}

new App();
 



