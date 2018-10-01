const User = require('../models/userModel');
const Record = require('../models/recordModel');

module.exports = {
    findAllRecords: (params, id) => {
        return new Promise ((resolve, reject) => {
          User.findById(id)
            .populate('records')
            .exec((err, records) => {
              if (err) {
                reject(err);
              } else {
                console.log(records.records)
                // console.log(params, id)
                   let fetchedRecords = records.records;
                //   // console.log(fetchedRecords);
                resolve(fetchedRecords);
                // resolve(fetchedRecords);
              }
            })
        })
       },
    //    Create Record
    createRecord: (params, user) => {
        
        return new Promise((resolve, reject) => {
    
    
          User.findById(user.user._id)
            .then(user => {
              console.log('----')
              console.log(user)
              let record = new Record({
                user_id: user._id,
                artistTitle: params.artist,
                songTitle: params.song,
                link: params.link
                
              })
              
              record
              .save()
              .then(record => {
               
      
                user.records.push(record);
                user.save()
                  .then(user => {
                   
                    resolve(record)
                  })
                  .catch(err => {
                    reject(err)
                  })
    
                
              })
              .catch(err => {
                reject(err);
              })
    
    
            })
            .catch(err => {
              reject(err)
            });
        })   
    },
    //Delete
    deleteRecord:  (params) => {
      return new Promise((resolve, reject) => {
        console.log(params)
        Records.findByIdAndRemove(params)
          .then(() => resolve())
          .reject((err) => reject(err))
      })
      .catch(err => {
        reject(err)
      })
    }
}



/// GET USER ID FROM PARAMS TO REDIRECT CONCAT ID ON THE END










// createRecord:(params, user) => {
//   //   let record = new Records({
//   //                     user_id: user._id,
//   //                     artistTitle: params.artist,
//   //                     songTitle: params.song,
//   //                     link: params.link
                      
//   //                   })
//   //                   console.log(user)
//   //                   console.log(record)
//   //   User.findOneAndUpdate(user, {$push: {Records: record}})
//   //   console.log(user);
//   // }