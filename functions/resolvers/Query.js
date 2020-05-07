const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
const firestore = admin.firestore();
const usersRef = firestore.collection('users');

module.exports = {
    me: (parent, args, {loginUser}) => loginUser,
    allUsers: async () => {
        const result = await usersRef.get();
        return result.docs.map(doc => {
            let user = doc.data();
            user.id = doc.id;
            return user;
        })
    },
    totalUsers: async () => {
        const count = await usersRef.get().then((docs => {
            return docs.size;
        }))
        return count;
    },
    selectUserById: async(parent, args) => {
        const user = await usersRef.doc(args.id).get().then((doc) => doc.data());
        user.id = args.id;
        return user;
    }
}