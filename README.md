# Federated Graphql example

As a project grows bigger, monolithic architecture are prone to scalability issue and slower continuous intergration. Many teams have moved onto microservice architecture which enables companies to break down a monolith into multple services. Federated graphql allows companies to expose a single data graph to the client, thus enable clients to fetch data from multiple services without knowing the sources.

Federated graphql highly encourage seperation of concerns design principle. It uses concern-based seperation where each services are allowed to extend a type from other service. This allows the extended implemenation to reside on the concerned service rather than the originating service.

This repo provides a basic example of such usecase where the review service extend the type `Product` originated from the product service.

## Usage

To run the 3 services in localhost: 
- product (http://localhost:4001/)
- review (http://localhost:4002/)
- federated graphql (http://localhost:4000/)

```bash
npm start
```

In graphql playground http://localhost:4000/, try and see the result
```
query {
  products {
    name
    reviews {
      review
    }
  }
}
```
```
query {
  reviews {
    products {
      name
      price
    }
  }
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)