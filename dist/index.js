#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Command } from "commander";
import { AjvValidatorTool } from "./tools/validator.js";
export const SERVER_NAME = "ajv-validator-mcp-server";
export const SERVER_VERSION = "1.0.0";
function init() {
    const server = new McpServer({
        name: SERVER_NAME,
        version: SERVER_VERSION,
        capabilities: { resources: {}, tools: {} },
    });
    const tool = new AjvValidatorTool();
    server.tool(tool.name, tool.description, tool.schema, async (params) => {
        return tool.execute(params);
    });
    return server;
}
async function main() {
    const program = new Command();
    program
        .name(SERVER_NAME)
        .version(SERVER_VERSION)
        .description("AJV Validator MCP Server")
        .action(async () => {
        const server = init();
        const transport = new StdioServerTransport();
        console.log(`Starting ${SERVER_NAME} v${SERVER_VERSION}...`);
        await server.connect(transport);
    });
    await program.parseAsync(process.argv);
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
