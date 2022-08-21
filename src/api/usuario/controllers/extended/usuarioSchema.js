'use strict';
const bcrypt = require('bcryptjs');
const validatePassword = (password, hash) =>
  bcrypt.compare(password, hash);
module.exports =
  (strapi) =>
  ({ nexus }) => ({
    typeDefs: `
    
    type UsuarioResponse {
      email: String
      username: String
      role: String
    }

    type UserLoginResponse {
        UsuarioEntity: UsuarioResponse
    
    }

    extend type Query {
      UserLogin(email: String! , 
        password: String!, 
        repassword: String!): UserLoginResponse!
    }
  `,
    resolvers: {
      Query: {
        UserLogin: {
          resolve: async (parent, args, { context }) => ({
            UsuarioEntity: async () => {
              if (args.password === args.repassword) {
                const [result] = await strapi.entityService.findMany(
                  'api::usuario.usuario',
                  {
                    where: { email: args.email },
                  }
                );

                const passResult = await validatePassword(
                  args.password,
                  result.password
                );
                if (passResult === false) {
                  throw new Error(
                    'Name for character with ID 1002 could not be fetched.'
                  );
                }
                return result;
              } else {
                throw new Error('Password doesn´t match');
              }
            },
          }),
        },
      },
    },
    resolversConfig: {
      'Query.UserLogin': {
        auth: {
          scope: ['api::usuario.usuario.find'],
        },
      },
    },
  });
