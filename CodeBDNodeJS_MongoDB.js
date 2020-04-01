//CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }

     const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description:  "task two"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
   
 })


//  db.collection('users').deleteMany({
//     age: 26
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

//  db.collection('tasks').updateMany({
//     completed: false
// }, {
//     $set: {
//         completed: true
//     }
// }).then((result) => {
//     console.log(result.modifiedCount)
// }).catch((error) => {
//     console.log(error)
// })

 //  const updatePromise = db.collection('users').updateOne({
    //      _id: new ObjectID("5e640ad7855527203807fc70")
    //     }, {
    //         // $set: {
    //         //     name: 'mike'            
    //         // }
    //         $inc: {
    //             age: 1 //increment by one
    //         }
    // })
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

//   db.collection('tasks').findOne({_id: new ObjectID("5e640bcbeeb3de3e4488ce9b")}, (error, task) => {
//         if(error)
//             console.log('unable to fetch')

//         console.log(task)
//     })

//     db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
//         console.log(tasks)
//     })

//      db.collection('users').findOne ({_id: new ObjectID("5e640ad7855527203807fc70")}, (error, user) => {
//         if(error){
//             return console.log('Unable to fetch')
//         }
//         console.log(user)
//      })

    //  db.collection('users').find({age: 29}).toArray((error, users) => {
    //     console.log(users)
    //  })

    //  db.collection('users').find({age: 29}).count((error, count) => {
    //     console.log(count)
    //  })
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Andrew',
    //     age: 26
    // }, (error, result) => {
    //     if(error)
    //         return console.log('unable to insert user')
    //     console.log(result.ops)
    // })

//     db.collection('users').insertMany([
//         {
//             name: 'jen',
//             age: 28
//         }, 
//         {
//             name: 'paul',
//             age: 29
//         }
//     ], (error, result) => {
//         if(error)
//             return console.log('unable to insert user')
//             console.log(result.ops)
//     })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'task one',
    //         completed: true
    //     },
    //     {
    //         description: 'task two',
    //         completed: false
    //     },
    //     {
    //         description: 'task three',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error)
    //         return console.log('unable to add task')
    //     console.log(result.ops)
    // })