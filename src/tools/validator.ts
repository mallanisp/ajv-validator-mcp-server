import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import { z } from "zod";
import { Tool } from "./tool.js";

export interface AjvValidatorParams {
  schema: Record<string, unknown>;
  data: Record<string, unknown>;
}

export type AjvValidationResult = [
  boolean,
  ErrorObject<string, Record<string, unknown>, unknown>[] | null | undefined
];

export class AjvValidatorTool extends Tool<AjvValidatorParams> {
  public readonly name = "ajv-validator";
  public readonly description =
    "Validates JSON data against a schema using AJV";

  public readonly schema = {
    schema: z
      .record(z.string(), z.unknown())
      .describe("The JSON schema to validate against"),
    data: z
      .record(z.string(), z.unknown())
      .describe("The JSON data to validate"),
  };

  private readonly ajv;

  constructor() {
    super();
    this.ajv = new Ajv.default({
      allErrors: true,
    });

    addFormats.default(this.ajv);

    this.ajv.addKeyword({
      keyword: "x-ls",
      validate: (schema: object, _data: object) => {
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

  public async execute({
    schema,
    data,
  }: AjvValidatorParams): Promise<CallToolResult> {
    const validate = this.ajv.compile(schema);

    const valid = validate(data);

    const text = valid
      ? "Data is valid"
      : JSON.stringify(validate.errors, null, 4);

    console.log("Validation result:", text);

    return {
      content: [{ type: "text", text }],
    };
  }
}
