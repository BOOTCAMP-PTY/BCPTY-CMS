'use strict';

module.exports =
  (strapi) =>
  ({ nexus }) => ({
    typeDefs: `
    type PopularityResponse {
      stars: Int!
      product: ProductEntityResponse
    }

    extend type Query {
      popularity(product: ID!): PopularityResponse
    }
  `,
    resolvers: {
      Query: {
        popularity: {
          resolve: async (parent, args, context) => ({
            stars: Math.floor(Math.random() * 5) + 1,
            product: args.product,
          }),
        },
      },
      PopularityResponse: {
        product: {
          resolve: async (parent, args) => ({
            value: await strapi.entityService.findOne(
              'api::product.product',
              parent.product,
              args
            ),
          }),
        },
      },
    },
    resolversConfig: {
      'Query.popularity': {
        auth: {
          scope: ['api::product.product.findOne'],
        },
      },
    },
  });
