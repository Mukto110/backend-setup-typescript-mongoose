import { Schema, model } from "mongoose";
// import validator from "validator";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "Fist name cannot be more than 20 char"],
    // custom made validator
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

    //     return value === firstNameStr;
    //   },
    //   message: "{VALUE} is not in capitalized format",
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: true,
    // Validation with validator
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not valid",
    // },
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required"],
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
