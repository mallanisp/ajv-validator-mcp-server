import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { AjvValidatorParams, AjvValidatorTool } from "./tools/validator.js";

export const SERVER_NAME = "ajv-validator-mcp-server";
export const SERVER_VERSION = "1.0.0";

function init() {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
    capabilities: { resources: {}, tools: {} },
  });

  const tool = new AjvValidatorTool();

  server.tool(
    tool.name,
    tool.description,
    tool.schema,
    async (params: AjvValidatorParams): Promise<CallToolResult> => {
      return tool.execute(params);
    }
  );

  return server;
}

async function main() {
  const server = init();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
