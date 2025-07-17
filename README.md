[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/mallanisp-ajv-validator-mcp-server-badge.png)](https://mseep.ai/app/mallanisp-ajv-validator-mcp-server)

# ajv-validator-mcp-server

This project provides a minimal [Model Context Protocol (MCP)](https://modelcontextprotocol.io/quickstart/server#node) server for validating JSON data against JSON Schema using [AJV](https://ajv.js.org/).

## Features

- Exposes an MCP tool `ajv-validator` for validating JSON data against a provided schema.
- Integrates [ajv-formats](https://github.com/ajv-validator/ajv-formats) for extended format validation.
- Designed for easy integration with MCP-compatible clients and tools.

## Usage

1. **Build the project:**
   Install dependencies and compile TypeScript sources.

2. **Configure MCP server:**
   Copy and edit the example configuration file to specify the Node.js binary and the built server entrypoint.

3. **Start the server:**
   Use `npm start` or run the built file directly with Node.js.

## Tool API

### ajv-validator

- **Description:** Validates JSON data against a provided JSON Schema using AJV.
- **Parameters:**
  - `schema` (object): The JSON Schema definition.
  - `data` (object): The JSON data to validate.
- **Returns:**
  Validation result message or a list of errors.

## Development

- Written in TypeScript (`src/`), output in `dist/`.
- Main MCP server entrypoint: `src/index.ts`.
- Includes scripts for building, starting, and watching the project.

## MCP SDK Inspector

The project is compatible with the [MCP SDK Inspector](https://modelcontextprotocol.io/docs/tools/inspector), a tool for exploring and testing MCP servers and tools. Use the Inspector to:

- Discover and invoke the `ajv-validator` tool interactively.
- Inspect tool parameters, responses, and error messages.
- Debug and validate your MCP server integration.

## Running the MCP SDK Inspector

To start the MCP SDK Inspector for this project, run:

```bash
npm run inspector
```

This command launches the Inspector and connects it to your built MCP server, allowing you to interactively test and debug the `ajv-validator` tool.

## License

MIT
-->
