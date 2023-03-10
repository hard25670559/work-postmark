
import JsonSchema from 'ajv';

const ActionSchema = {
  type: 'object',
  properties: {
    action: {
      type: 'string',
      format: 'email',
      minLength: 5,
      maxLength: 10,
    },
  },
  required: [
    'action',
  ],
};

const jsonSchema = new JsonSchema({
  allErrors: true,
});

export function ActionValidate(data: unknown) {
  const validate = jsonSchema.compile(ActionSchema);
  const valid = validate(data);

  return {
    error: !valid,
    messages: validate.errors,
  }
}
