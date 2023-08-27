const { User, Exercise, mongoose } = require('./db');


function validateId(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) throw new Error("Invalid id");
}

async function getUsers() {
    return await User.find();
}

async function getUser(id) {
    validateId(id);
    return await User.findById(id);
}

async function createUser(username) {
    const checkUserExists = await User.findOne({ username });
    if (checkUserExists) throw new Error("User already exists");

    const user = new User({
        username
    });

    return await user.save();
}

async function createExercise(userId, exercise) {
    const user = await getUser(userId);
    if (!user) throw new Error("User doesn't exist");

    const log = {
        ...exercise,
        username: user.username
    }
    const model = new Exercise(log);

    const result = await model.save()
        .then(data => {
            const { username, description, duration, date } = data._doc;
            return {
                "username": username,
                "description": description,
                "duration": duration,
                "_id": user._id, // passes id deep equal test  
                "date": new Date(date).toDateString() // passes date deep equal test         
            }
        })
        .catch(err => { throw new (err) });

    return result;

}

async function getExerciseLogs(userId, from, to, limit) {
    const user = await getUser(userId);
    if (!user) throw new Error("User doesn't exist");

    const query = {
        username: user.username,
    }

    if (from && to) {
        query.date = {
            "$gte": from,
            "$lte": to
        }
    }
    const results = await Exercise.find(query).limit(limit);
    const log = results.map(x => {
        return {
            date: new Date(x.date).toDateString(),
            duration: x.duration,
            description: x.description
        }
    });

    const resultsMap = {
        username: user.username,
        _id: user.id,
        count: log.length,
        log
    }

    return resultsMap;
}

exports.createUser = createUser;
exports.createExercise = createExercise;
exports.getUsers = getUsers;
exports.getExerciseLogs = getExerciseLogs;