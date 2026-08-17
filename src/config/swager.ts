import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
 definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for the Task Management System.",
    },
    components: {
      securitySchemes: {
        bearerAuth: { // The identifier name used below
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // This applies JWT auth to EVERY endpoint globally
    security: [
      {
        bearerAuth: [], 
      },
    ],
  },
  // Scans all subfolders inside the "features" directory for TypeScript files
  apis: ["./src/features/**/*.router.ts"], 
};
export const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);