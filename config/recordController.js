const User = require('../models/userModel');
const Record = require('../models/recordModel');

module.exports = {
    // findAllRecords: (params) => {
    //     return new Promise ((resolve, reject) => {
    //       User.find(params)
    //         .populate('records')
    //         .exec((err, records) => {
    //           if (err) {
    //             reject(err);
    //           } else {
    //             resolve(records);
    //           }
    //         })
    
        
    
    //     })
    //    },
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
                // console.log('##################### ITEM TO BE SAVED')
                // console.log(record)
                // console.log('##################### ITEM TO BE SAVED IN')
                // console.log(user);
                console.log(user.records)
                User.records.push(record);
                User.save()
                
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
    } 




}

















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