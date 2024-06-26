# Next.js full-stack web application on Azure Static Web Apps

This is a demo Next.js full-stack web application. The application is deployed to a single Azure Static Web Apps resource, and makes use of Static Web Apps' managed backend integration to host the server functions.

## Local development

To get started with local development, follow these steps:
    
```bash
npm install
npm run dev
```

You may also configure your environment variables so that you can access the Cosmos DB database. Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
COSMOSDB_KEY=<ENTER COSMOS DB KEY>
COSMOSDB_ENDPOINT=<ENTER COSMOS DB ENDPOINT>
```

Access the application at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy to Azure Static Web Apps, create a Static Web Apps resource from the Azure Portal. Specify `Next.js` as the build preset.

Set the following environment variables in the Static Web Apps resource from the Azure Portal:

"COSMOSDB_KEY": "<ENTER COSMOS DB KEY>",
"COSMOSDB_ENDPOINT": "<ENTER COSMOS DB ENDPOINT>",