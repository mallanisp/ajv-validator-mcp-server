import Ajv from "ajv";
import addFormats from "ajv-formats";
import { z } from "zod";
import { Tool } from "./tool.js";
export class AjvValidatorTool extends Tool {
    name = "ajv-validator";
    description = "Validates JSON data against a schema using AJV";
    schema = {
        schema: z
            .record(z.string(), z.unknown())
            .describe("The JSON schema to validate against"),
        data: z
            .record(z.string(), z.unknown())
            .describe("The JSON data to validate"),
    };
    ajv;
    constructor() {
        super();
        this.ajv = new Ajv.default({
            allErrors: true,
        });
        addFormats.default(this.ajv);
        this.ajv.addKeyword({
            keyword: "x-ls",
            validate: (schema, data) => {
                for (const prop in Object.keys(schema)) {
                    if (!(prop in ["rdfPredicate", "rdfIRI"])) {
                        return false;
                    }
                }
                return true;
            },
            errors: false,
        });
        this.ajv.addKeyword({
            keyword: "unit",
            errors: false,
        });
        this.ajv.addKeyword({
            keyword: "x-displayHint",
            errors: false,
        });
    }
    async execute({ schema, data, }) {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);
        const text = valid
            ? "Data is valid"
            : JSON.stringify(validate.errors, null, 4);
        return {
            content: [{ type: "text", text }],
        };
    }
}
