const { GraphQLScalarType } = require(`graphql`)

module.exports = {
    User:{},
    DateTime: new GraphQLScalarType({
        name: `DateTime`,
        description: `A valid date time value`,
        parseValue: value => value.toDate(),
        serialize: value => value.toDate(),
        parseLiteral: ast => ast.value
    })
}