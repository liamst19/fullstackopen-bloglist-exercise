const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


/** Notes
 * Having an array of blogs in the user schema
 * may be a maintenance nightmare, when one considers
 * that blog entries are frequently added and removed.
 *
 * There would need a process to frequently check the
 * blogs collection to see if the blog entries exist,
 * and also whether entries are missing from users collection.
 *
 * In addition, the blog collection must be checked for
 * nonexistent users.
 */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)