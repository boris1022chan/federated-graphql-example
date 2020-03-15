const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

// hard coded data
const products = [
  {
    upc: 0,
    name: "iphone",
    price: 999
  },
  {
    upc: 1,
    name: "ipad",
    price: 899
  },
  {
    upc: 2,
    name: "macbook pro",
    price: 2999
  }
]

const typeDefs = gql`
  type Query {
    products: [Product]
  }

  type Product @key(fields: "upc") {
    upc: Int
    name: String
    price: Int
  }
`

const resolvers = {
  Query: {
    products: () => products
  },
  Product: {
    __resolveReference: (reference) => products.filter(p => p.upc===reference.upc)[0]
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{typeDefs, resolvers}])
})
server.listen(4001).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})