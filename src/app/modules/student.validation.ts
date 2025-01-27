import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      "string.empty": "First name is required",
      "string.max": "First name cannot be more than 20 characters",
      "string.pattern.base": "First name must be capitalized",
    }),
  middleName: Joi.string().max(20).allow(null, "").messages({
    "string.max": "Middle name cannot be more than 20 characters",
  }),
  lastName: Joi.string().max(20).required().messages({
    "string.empty": "Last name is required",
    "string.max": "Last name cannot be more than 20 characters",
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Student ID is required",
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "{#value} is not a valid gender",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string().isoDate().optional().messages({
    "string.isoDate": "Date of birth must be in ISO format",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
    .optional()
    .messages({
      "any.only": "{#value} is not a valid blood group",
    }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().optional().messages({
    "string.uri": "Profile image must be a valid URI",
  }),
  isActive: Joi.string().valid("active", "blocked").default("active").messages({
    "any.only": "{#value} is not a valid status",
  }),
});

export default studentValidationSchema;
