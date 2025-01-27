import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name cannot be more than 20 characters" }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required" }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required" }),
});

const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: "Student ID is required" }),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
  }), // Removed `nonempty` here
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  contactNo: z.string().nonempty({ message: "Contact number is required" }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: "Emergency contact number is required" }),
  bloodGroup: z
    .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])
    .optional(),
  presentAddress: z
    .string()
    .nonempty({ message: "Present address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
});

export default studentValidationSchema;
