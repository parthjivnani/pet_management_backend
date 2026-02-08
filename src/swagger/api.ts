export default {
  openapi: "3.0.1",
  info: {
    description:
      "Pet Management Backend API – authentication, pets, species, and adoptions.",
    title: "Pet Management API",
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0",
    },
    version: "v1",
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  paths: {
    // ----- Auth -----
    "/api/auth/test": {
      get: {
        tags: ["Authentication"],
        summary: "Test route",
        operationId: "authTest",
        parameters: [],
        responses: {
          "200": { description: "Success" },
        },
        security: [],
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register (signup)",
        operationId: "register",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": { description: "User created" },
          "400": { description: "Bad request (e.g. email already exists)" },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        operationId: "login",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Login success; returns user and token" },
          "403": {
            description: "Account not exist / deactivated / incorrect password",
          },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
    },
    "/api/auth/send-verification-link": {
      post: {
        tags: ["Authentication"],
        summary: "Send forgot-password verification link to email",
        operationId: "sendVerificationLink",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SendVerificationLinkRequest",
              },
            },
          },
        },
        responses: {
          "200": { description: "Link sent" },
          "404": { description: "Email not found" },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
    },
    "/api/auth/forgot-password": {
      post: {
        tags: ["Authentication"],
        summary:
          "Set new password (requires valid token from verification link)",
        operationId: "forgotPassword",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Password changed successfully" },
          "403": { description: "Failed or link already used" },
          "500": { description: "Link expired or internal error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/auth/reset-password": {
      post: {
        tags: ["Authentication"],
        summary: "Reset password using token (e.g. from email link)",
        operationId: "resetPasswordWithToken",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Password reset successfully" },
          "400": { description: "Token and password required" },
          "401": { description: "Invalid token" },
          "403": { description: "Link expired or already used" },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
    },

    // ----- Pets -----
    "/api/pets": {
      get: {
        tags: ["Pets"],
        summary: "List pets (public)",
        operationId: "getPets",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer" },
            description: "Page number",
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer" },
            description: "Items per page",
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search by name",
          },
          {
            name: "species",
            in: "query",
            schema: { type: "string" },
            description: "Filter by species",
          },
          {
            name: "breed",
            in: "query",
            schema: { type: "string" },
            description: "Filter by breed",
          },
          {
            name: "ageMin",
            in: "query",
            schema: { type: "number" },
            description: "Minimum age",
          },
          {
            name: "ageMax",
            in: "query",
            schema: { type: "number" },
            description: "Maximum age",
          },
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["Available", "Adopted"] },
            description: "Pet status",
          },
        ],
        responses: {
          "200": { description: "Paginated list of pets" },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
      post: {
        tags: ["Pets"],
        summary: "Create pet (admin)",
        operationId: "createPet",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/CreatePetRequest" },
            },
          },
        },
        responses: {
          "201": { description: "Pet created" },
          "400": { description: "Validation error" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/pets/{id}": {
      get: {
        tags: ["Pets"],
        summary: "Get pet by ID (public)",
        operationId: "getPetById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Pet details" },
          "404": { description: "Pet not found" },
          "500": { description: "Internal server error" },
        },
        security: [],
      },
      put: {
        tags: ["Pets"],
        summary: "Update pet (admin)",
        operationId: "updatePet",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/UpdatePetRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Pet updated" },
          "400": { description: "Validation error" },
          "404": { description: "Pet not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
      delete: {
        tags: ["Pets"],
        summary: "Delete pet (admin)",
        operationId: "deletePet",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Pet deleted" },
          "404": { description: "Pet not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },

    // ----- Adoptions -----
    "/api/adoptions": {
      post: {
        tags: ["Adoptions"],
        summary: "Apply to adopt a pet (authenticated user)",
        operationId: "applyAdoption",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApplyAdoptionRequest" },
            },
          },
        },
        responses: {
          "201": { description: "Application submitted" },
          "400": { description: "Pet not available or already applied" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
      get: {
        tags: ["Adoptions"],
        summary: "List all adoption applications (admin)",
        operationId: "getAllAdoptions",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["Pending", "Approved", "Rejected"],
            },
          },
        ],
        responses: {
          "200": { description: "Paginated list of adoptions" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/adoptions/my": {
      get: {
        tags: ["Adoptions"],
        summary: "Get my adoption applications (authenticated user)",
        operationId: "getMyApplications",
        parameters: [],
        responses: {
          "200": { description: "List of current user applications" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/adoptions/{id}": {
      get: {
        tags: ["Adoptions"],
        summary: "Get adoption by ID (admin)",
        operationId: "getAdoptionById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Adoption details" },
          "404": { description: "Adoption not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/adoptions/{id}/approve": {
      patch: {
        tags: ["Adoptions"],
        summary: "Approve adoption (admin)",
        operationId: "approveAdoption",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Adoption approved" },
          "404": { description: "Adoption not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/adoptions/{id}/reject": {
      patch: {
        tags: ["Adoptions"],
        summary: "Reject adoption (admin)",
        operationId: "rejectAdoption",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Adoption rejected" },
          "404": { description: "Adoption not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },

    // ----- Species -----
    "/api/species": {
      get: {
        tags: ["Species"],
        summary: "List species (admin)",
        operationId: "getSpecies",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
        ],
        responses: {
          "200": { description: "Paginated list of species" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
      post: {
        tags: ["Species"],
        summary: "Create species (admin)",
        operationId: "createSpecies",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateSpeciesRequest" },
            },
          },
        },
        responses: {
          "201": { description: "Species created" },
          "400": { description: "Validation error" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
    "/api/species/{id}": {
      get: {
        tags: ["Species"],
        summary: "Get species by ID (admin)",
        operationId: "getSpeciesById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Species details" },
          "404": { description: "Species not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
      put: {
        tags: ["Species"],
        summary: "Update species (admin)",
        operationId: "updateSpecies",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateSpeciesRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Species updated" },
          "404": { description: "Species not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
      delete: {
        tags: ["Species"],
        summary: "Delete species (admin)",
        operationId: "deleteSpecies",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Species deleted" },
          "404": { description: "Species not found" },
          "500": { description: "Internal server error" },
        },
        security: [{ Bearer: [] }],
      },
    },
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: "apiKey",
        description: "Bearer token – use header: Authorization: Bearer {token}",
        name: "Authorization",
        in: "header",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string", maxLength: 100 },
          lastName: { type: "string", maxLength: 100 },
          email: { type: "string", format: "email", maxLength: 100 },
          password: { type: "string", maxLength: 200 },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      SendVerificationLinkRequest: {
        type: "object",
        required: ["email", "path"],
        properties: {
          email: { type: "string", format: "email" },
          path: {
            type: "string",
            description:
              "Frontend path to append token, e.g. auth/reset-password",
          },
        },
      },
      ForgotPasswordRequest: {
        type: "object",
        required: ["password"],
        properties: {
          password: { type: "string" },
        },
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["token", "password"],
        properties: {
          token: { type: "string", description: "JWT from verification link" },
          password: { type: "string" },
        },
      },
      CreatePetRequest: {
        type: "object",
        required: ["name", "species", "breed", "age"],
        properties: {
          name: { type: "string", maxLength: 100 },
          species: { type: "string", maxLength: 50 },
          breed: { type: "string", maxLength: 50 },
          age: { type: "number", minimum: 0 },
          description: { type: "string", maxLength: 1000 },
          image: {
            type: "string",
            format: "binary",
            description: "Pet image file",
          },
        },
      },
      UpdatePetRequest: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 100 },
          species: { type: "string", maxLength: 50 },
          breed: { type: "string", maxLength: 50 },
          age: { type: "number", minimum: 0 },
          description: { type: "string", maxLength: 1000 },
          status: { type: "string", enum: ["Available", "Adopted"] },
          image: {
            type: "string",
            format: "binary",
            description: "Pet image file",
          },
        },
      },
      ApplyAdoptionRequest: {
        type: "object",
        required: ["petId"],
        properties: {
          petId: { type: "string", description: "MongoDB ObjectId of the pet" },
          message: { type: "string", maxLength: 500 },
        },
      },
      CreateSpeciesRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", maxLength: 100 },
        },
      },
      UpdateSpeciesRequest: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 100 },
        },
      },
    },
  },
  security: [{ Bearer: [] }],
};
