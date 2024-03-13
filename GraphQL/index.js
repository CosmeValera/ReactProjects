const { gql, ApolloServer } = require('apollo-server');

const people = [
    {
        name: "Midu",
        phone: "034-1234567",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Youssef",
        phone: "044-1234567",
        street: "Avenida Fullstack",
        city: "Mataro",
        id: "3d599470-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Itzi",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "3d599471-3436-11e9-bc57-8b80ba54c431"
    },
]

const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPeople: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => people.length,
        allPeople: () => people,
        findPerson: (root, args) => {
            const {name} = args
            return people.find(person => person.name === name)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})