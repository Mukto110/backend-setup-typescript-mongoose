import { StudentModel } from "../student.mode";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentService = {
  createStudentIntoDB,
};
