import { Student } from "./student.mode";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);

  const student = new Student(studentData); // create an instance
  if (await student.isUserExist(studentData.id)) {
    throw new Error("User already exists!");
  }
  const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
