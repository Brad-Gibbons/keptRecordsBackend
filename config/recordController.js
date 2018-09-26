const User = require('../models/userModel');
const Records = require('../models/recordModel');

module.exports = {
    findAllRecords: (params) => {
        return new Promise ((resolve, reject) => {
          User.find(params)
            .populate('records')
            .exec((err, records) => {
              if (err) {
                reject(err);
              } else {
                resolve(records);
              }
            })
    
        
    
        })
       },
    //    Create Record
    createRecord: (params) => {

        return new Promise((resolve, reject) => {
    
    
          User.findById(params._id)
            .then(user => {

    
              let record = new Records({
                user_id: params._id,
                artistTitle: params.artist,
                songTitle: params.song,
                link: params.link
                
                
              })
              console.log(record.artistTitle, record.songTitle);

    
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
    } 
}