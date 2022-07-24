require('dotenv').config();

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Essa é uma aplicação que simula transações de compra e venda de ações',
    version: '1.0.0',
    title: 'Desafio XP',
    contact: {
      email: 'gabresendemkt@gmail.com',
    },
  },
  servers: [
    {
      url: 'https://passaportexp.herokuapp.com',
      description: 'API PRODUÇÃO',
    },
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'API TESTE',
    },
  ],
  paths: {
    '/login': {
      post: {
        tags: ['login'],
        summary: 'Login de usuário',
        description: 'Login de usuário',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/userLogin',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    token: 'token',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Usuário ou senha inválidos',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: [
          'users',
        ],
        security: [{ bearerAuth: [] }],
        summary: 'Retorna um usuário pelo ID',
        description: 'Retorna as informações do usuário pelo Id informado',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do cliente',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/getUserById',
                  },
                },
              },
            },
          },
          404: {
            description: 'usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/userNotFound',
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
        },
      },
    },
    '/users/conta/{id}': {
      get: {
        tags: [
          'users',
        ],
        security: [{ bearerAuth: [] }],
        summary: 'Retorna o saldo do usuário pelo ID',
        description: 'Retorna o saldo do usuário pelo Id informado',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do cliente',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'integer',
                    name: 'string',
                    email: 'string',
                    balance: 'number (double)',
                    createdAt: "Date('YYYY-MM-DD HH:mm:ss')",
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'usuário não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/userNotFound',
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/DefaultMessageError',
              },
            },
          },
        },
      },
    },
    '/users/conta/deposito': {
      post: {
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        summary: 'Deposito de dinheiro',
        description: 'Deposita dinheiro na conta do usuário informado pelo Id',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/transactionsBankUser',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/depositUserAccount',
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Os dados são obrigatórios e não podem ser igual a 0',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/conta/saque': {
      post: {
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        summary: 'Saque de dinheiro',
        description: 'Saca dinheiro da conta do usuário informado pelo Id',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/transactionsBankUser',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Saque realizado com sucesso',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Os dados são obrigatórios e não podem ser igual a 0',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/investimentos/comprar': {
      post: {
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        summary: 'Compra de ações',
        description: 'Compra de ações do usuário informado pelo Id',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/transactionStockUser',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Compra realizada com sucesso',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Os dados são obrigatórios e não podem ser igual a 0',
                  },
                },
              },
            },
          },
          404: {
            description: 'usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/userNotFound',
                },
              },
            },
          },
        },
      },
    },
    '/users/investimentos/vender': {
      post: {
        tags: ['users'],
        security: [{ bearerAuth: [] }],
        summary: 'Venda de ações',
        description: 'Venda de ações do usuário informado pelo Id',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/transactionStockUser',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Venda realizada com sucesso',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Os dados são obrigatórios e não podem ser igual a 0',
                  },
                },
              },
            },
          },
          404: {
            description: 'usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/userNotFound',
                },
              },
            },
          },
        },
      },
    },
    '/users': {
      post: {
        tags: ['users'],
        summary: 'Cadastro de usuário',
        description: 'Cadastra um novo usuário',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/definitions/LoginPayload',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Usuário cadastrado com sucesso',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    message: 'Nome é obrigatório e deve ter mais de 3 caracteres',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/wallet/{id}': {
      get: {
        tags: ['wallet'],
        security: [{ bearerAuth: [] }],
        summary: 'Lista de ativos',
        description: 'Lista de ativos do usuário informado pelo userId',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id do usuário',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    example: {
                      id: 'integer',
                      user_id: 'integer',
                      stock_id: 'integer',
                      quantity: 'integer',
                      updatedAt: "Date('YYYY-MM-DD HH:mm:ss')",
                      value: "Decimal('10.00')",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
          404: {
            description: 'usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/userNotFound',
                },
              },
            },
          },
        },
      },
    },
    '/wallet/{id}/stock/{stockId}': {
      get: {
        tags: ['wallet'],
        security: [{ bearerAuth: [] }],
        summary: 'Ativo do usuário',
        description: 'Ativo do usuário informado pelo userId e stockId',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id do usuário',
            required: true,
            type: 'integer',
          },
          {
            in: 'path',
            name: 'stockId',
            description: 'Id do ativo',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'integer',
                    user_id: 'integer',
                    stock_id: 'integer',
                    quantity: 'integer',
                    updatedAt: "Date('YYYY-MM-DD HH:mm:ss')",
                    value: "Decimal('10.00')",
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: {
                message: 'O usuário não possui essa ação',
              },
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/definitions/DefaultMessageError',
            },
          },
        },
      },
    },
    '/stocks': {
      get: {
        tags: ['stocks'],
        summary: 'Lista de ativos',
        description: 'Lista todos os ativos',
        consumes: [
          'application/json',

        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    example: {
                      id: 'integer',
                      stock: 'string',
                      ticker: 'string',
                      quantity: 'integer',
                      value: "Decimal('10.00')",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
        },
      },
    },
    '/stocks/{id}': {
      get: {
        tags: ['stocks'],
        summary: 'Ativo',
        description: 'Ativo informado pelo id',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id do ativo',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    id: 'integer',
                    stock: 'string',
                    ticker: 'string',
                    quantity: 'integer',
                    value: "Decimal('10.00')",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    getUserById: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
    userNotFound: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'usuário não enocontrado',
        },
      },
    },
    DefaultMessageError: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Internal Server Error',
        },
      },
    },
    depositUserAccount: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Deposito realizado com sucesso',
        },
      },
    },
    transactionStockUser: {
      type: 'object',
      properties: {
        userId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
        quantity: {
          type: 'integer',
        },
      },
    },
    LoginPayload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    userLogin: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  },
  components: {
    schemas: {
      transactionsBankUser: {
        type: 'object',
        properties: {
          userId: {
            type: 'integer',
          },
          amount: {
            type: 'number',
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
