const required = () => (value) => {
  if (value === null || value === undefined || value === "") {
    return "Requirement error"
  }
  return null
}

const minLength = (min) => (value) => {
  if (value.length < min) {
    return `Minimum length is ${min}`
  }
  return null
}

const maxLength = (max) => (value) => {
  if (value.length > max) {
    return `Maximum length is ${max}`
  }
  return null
}

const isEmail = () => (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(value)) {
    return "Invalid email"
  }
  return null
}

function validate(data, schema) {
  const errors = {}
  for (const field in schema) {
    for (const validator of schema[field]) {
      const error = validator(data[field])
      if (error) {
        errors[field] = error
        break
      }
    }
  }
  return errors
}

function validateBody(schema) {
  return (req, res, next) => {
    const data = req.body || {}
    const errors = validate(data, schema)
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors })
    }
    next()
  }
}

const registerSchema = {
  name: [required(), maxLength(100)],
  email: [required(), isEmail()],
  password: [required(), minLength(6)],
}

const loginSchema = {
  email: [required(), isEmail()],
  password: [required(), minLength(6)],
}
module.exports = {
  validate,
  validateBody,
  required,
  minLength,
  maxLength,
  isEmail,
  registerSchema,
  loginSchema,
}
