const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { menuSchema } = require('./menuModel')
mongoose.set('debug', true);

/* require('../configs/mongoose.js') */
/*By default mongoose creates a schema. We can create a custom schema,
and can decide what to do with object just before or after getting saved*/
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        trim: true
    },
    distance: [
        {
            longitude: {
                type: String,
                required: true,
            },
            latitude: {
                type: String,
                required: true,
            }
        },
    ],
    cuisine: [{
        type: String,
        required: true
    }],
    budget: {
        type: String,
    },
    ratings: {
        type: Number,
        validate(rating) {
            if (!(rating > 0 && rating < 6)) {
                throw new Error("Invalid Rating Entered");
            }
        },
    },
    menu: [menuSchema],
});

//To create JSON Web Token for session after login -- Multiple Tokens can be created to provide multiple login (iPad, Laptop, Mobile etc)
//.methods because we are working on the whole user collection (instances)
//schema.methods are used wrt the instance
//i.e var dog = new Animal({"name":"Tommy","species":"labrador"})
//dog.method() 
/* userSchema.methods.generateTokenAuth = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "ThisIsAGeneratedToken");
    console.log(`In generateTokenAuth():${token}`);
    user.tokens.push({ token });
    await user.save();
    return user;
}; */

//To create a custom findBySomething() search -- For Single User (Models)
//schema.statics is wrt the entire collection
//i.e  Animal.staticFunction()
/* userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Unable to login");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Unable to login");
    return user;
};
 */
//pre - Called just before saving in DB or before validation
//post - Called just after saving in DB or after validation
//Same as Triggers
/* userSchema.pre("save", async function (next) {
    //Our argument which is going to be saved is referred by this
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
 */
const Restaurant = mongoose.model("Restaurant", restaurantSchema, 'restaurant');

module.exports = Restaurant;
