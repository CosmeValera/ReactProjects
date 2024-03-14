const { gql, ApolloServer } = require('apollo-server');
const {v1: uuid} = require('uuid');

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
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPeople: [Person]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => people.length,
        allPeople: () => people,
        findPerson: (root, args) => {
            const {name} = args
            return people.find(person => person.name === name)
        },
    },
    Mutation: {
        addPerson: (root, args) => {
            const person = {...args, id: uuid()}
            people.push(person) // update database with new person
            return person
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})