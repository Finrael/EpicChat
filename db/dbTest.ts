// import * as Mongoose from 'mongoose';
// interface ITest extends Mongoose.Document {
//   name: string;
// }
// let testFunction = () => {
//   Mongoose.connect('mongodb://localhost/db');
//   let db = Mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function () {
//     console.log("we are in");
//     let testSchema = new Mongoose.Schema({ name: String });
//     let test = Mongoose.model<ITest>('testname', testSchema);
//     let entry = new test({ name: 'ovidio' });
//     console.log(entry.name)
//     db.close();
//   });

// }
// testFunction();
