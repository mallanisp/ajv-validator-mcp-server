import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AjvValidatorTool } from "./tools/validator.js";
export const SERVER_NAME = "ajv-validator";
export const SERVER_VERSION = "1.0.0";
function init() {
    const server = new McpServer({
        name: SERVER_NAME,
        version: SERVER_VERSION,
        capabilities: {
            resources: {},
            tools: {},
        },
    });
    const tool = new AjvValidatorTool();
    server.tool(tool.name, tool.description, tool.schema, async (params) => {
        return tool.execute(params);
    });
    return server;
}
async function main() {
    const server = init();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
