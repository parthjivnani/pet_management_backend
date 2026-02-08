export default {
  openapi: '3.0.1',
  info: {
    description: 'This is CMS POC Node API using TypeScript',
    title: 'CMS POC Node API',
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/liscences/LIS',
    },
    version: 'v1',
  },
  servers: [
    {
      url: 'https://cms-poc.devitsandbox.com/node',
    },
    {
      url: 'http://localhost:3002',
    },
  ],
  paths: {
    // auth
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login',
        operationId: 'Login',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  email: '',
                  password: '',
                },
              },
              example: '{\r\n"email":"EmailID",\r\n"password":"Password"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/verify-otp': {
      post: {
        tags: ['Authentication'],
        summary: 'Verify OTP',
        operationId: 'Verify OTP',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  email: '',
                  otp: '',
                },
              },
              example: '{\r\n"email":"EmailID",\r\n"otp":"OTP"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Reset Password',
        operationId: 'ResetPassword',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  password: '',
                },
              },
              example: '{\r\n"password":"Password"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/change-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Change Password',
        operationId: 'ChangePassword',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  oldPassword: '',
                  newPassword: '',
                },
              },
              example:
                '{\r\n"oldPassword":"oldPassword",\r\n"newPassword":"newPassword"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/change-password-login': {
      post: {
        tags: ['Authentication'],
        summary: 'User First Login',
        operationId: 'FirstLogin',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  newPassword: '',
                },
              },
              example: '{\r\n"newPassword":"Password"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/send-verification-link': {
      post: {
        tags: ['Authentication'],
        summary: 'Forgot Password Link',
        operationId: 'ForgotPasswordLink',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  email: '',
                  path: 'auth/reset-password',
                },
              },
              example:
                '{\r\n"email":"EmailID",\r\n"path":"auth/reset-password"\r\n}',
            },
          },
        },
      },
    },
    '/api/auth/send-otp-to-email': {
      post: {
        tags: ['Authentication'],
        summary: 'Resend OTP',
        operationId: 'Resend OTP',
        parameters: [],
        responses: {
          '200': {
            description: '',
            headers: {},
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'json',
                example: {
                  email: '',
                },
              },
              example: '{\r\n"email":"EmailID"}',
            },
          },
        },
      },
    },
    '/api/auth/logout': {
      get: {
        tags: ['Authentication'],
        summary: 'LogOut',
        operationId: 'LogOut',
        parameters: [],
        responses: {
          200: {
            description: '',
            headers: {},
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        description:
          'Input your Bearer token in this format - Bearer {your token here} to access this API',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  security: [
    {
      Bearer: ['Bearer'],
    },
  ],
};
