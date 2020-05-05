const functions = require('firebase-functions');
const admin = require(`firebase-admin`);

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const usersRef = firestore.collection('users');

const { ApolloServer} = require(`apollo-server-cloud-functions`);
const { readFileSync } = require(`fs`);

const resolvers = require('./resolvers')
let typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: async ({ req, res }) => {
        const loginUser = await getLoginUser(req,res);
        return { loginUser };
    }
});

const getLoginUser = (req, resp) => {
    if(req.headers.authorization == null){
        return null
    }
    const match = req.headers.authorization.match(/^Bearer (.*)$/);
    const token = admin.auth().verifyIdToken(match[1]).then(async(decodeToken) => {
        const uid = decodeToken.uid;
        let user = await usersRef.doc(uid).get().then((doc) => {
            return doc.data();
        });
        user.id = uid;
        return user;
    }).catch( (error) => {
        return null
    });
    return token;
}


exports.graphql = functions.https.onRequest(server.createHandler());