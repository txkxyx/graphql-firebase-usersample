const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
const firestore = admin.firestore();

const usersRef = firestore.collection('users');

module.exports = {
    me: (parent, args, {loginUser}) => loginUser,
    allUsers: async () => {
        const result = await usersRef.get();
        return result.docs.map(doc => {
            return doc.data();
        })
    },
    selectUserById: async(parent, args) => {
        const user = await usersRef.doc(args.id).get().then((doc) => doc.data());
        user.id = args.id;
        return user;
    }
}