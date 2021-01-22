const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (email) {
                const self = this;
                return new Promise(async function (resolve, reject) {
                    const user = await self.constructor
                        .findOne({ email })
                        .exec()
                        .catch(() => {
                            reject('Internal Error');
                        });
                    if (user) {
                        if (self.id === user.id) {
                            resolve(true);
                        }
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            },
            message: 'Email is taken',
        },
    },
    password: {
        type: String,
        required: true,
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
    ],
});

module.exports = mongoose.model('User', userSchema);
