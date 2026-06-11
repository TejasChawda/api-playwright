import { Ajv } from 'ajv';

const ajv = new Ajv();

export function validateSchema(data: any, schema: object): boolean {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    return valid as boolean;
}