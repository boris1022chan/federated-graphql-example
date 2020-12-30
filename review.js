const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

// hard coded data
const reviews = [
  {
    id: 0,
    upc: 0,
    review: "This is good"
  },
  {
    id: 1,
    upc: 0,
    review: "This is great"
  },
  {
    id: 2,
    upc: 1,
    review: "This is excellent"
  }
]

const typeDefs = gql`
  type Query {
    reviews: [Review]
  }

  type Review {
    product: Product
    review: String
  }

  extend type Product @key(fields: "upc") {
    upc: Int @external
    reviews: [Review]
  }
`

const resolvers = {
  Query: {
    reviews: () => reviews,
  },
  Review: {
    product(review) {
      return { __typename: "Product", upc: review.upc }
    }
  },
  Product: {
    reviews(product) {
      return reviews.filter(r => product.upc===r.upc)
    },
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
})

server.listen(4002).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
