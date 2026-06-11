import { Ajv } from 'ajv';

const ajv = new Ajv();

//Note - if u want to validate formats, then you need to add the ajv-formats package and 
//register it with Ajv instance

export function validateSchema(data: any, schema: object): boolean {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    return valid as boolean;
}