const functions = require('firebase-functions');
const admin = require(`firebase-admin`);
const firestore = admin.firestore();
const usersRef = firestore.collection('users');

module.exports = {
    async singUpUser(parent, args){
        const singupUser = await admin.auth().createUser({
            email: args.mail,
            password: args.password,
            displayName: args.name
        }).then((userRecord) => {
            const id = userRecord.uid;
            const user = usersRef.doc(id).set({
                mail: args.mail,
                name: args.name,
                icon: args.icon,
                created: new Date(),
                updated: new Date()
            }).then(async() => {
                let user = await usersRef.doc(id).get().then((doc) => {
                    return doc.data()
                });
                user.id = id;
                return user;
            })
            return user;
        }).catch(() => {throw new Error('Error SingUp')});
        return singupUser;
    },
    async updateUser(parent, args, {loginUser}){
        if(loginUser === null){
            throw new Error('No SignUp')
        }
        await admin.auth().updateUser(args.id,{
            email: args.mail,
            displayName: args.name
        }).catch((error) => {throw new Error(error)});
        const updatedUser = await usersRef.doc(args.id).set({
            mail: args.mail,
            name: args.name,
            icon: args.icon,
            updated: new Date()
        }).then(async() => {
            let user = await usersRef.doc(args.id).get().then((doc) => doc.data());
            user.id = args.id;
            return user;
        });
        return updatedUser;
    },
    async deleteUser(parent, args, {loginUser}){
        if(loginUser === null){
            throw new Error('No SignUp')
        }
        await admin.auth().deleteUser(args.id).then(async() => {
            await usersRef.doc(args.id).delete();
        }).catch(() => {throw new Error('No user')});
        
        return args.id;
    }
}