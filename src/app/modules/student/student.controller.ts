import { Request, Response } from "express";
import { StudentService } from "./student.service";
import studentValidationSchema from "../student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi -->

    const { student: studentData } = req.body;

    const { error } = studentValidationSchema.validate(studentData);

    const result = await StudentService.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error,
      });
    }

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDB();
    if (res.headersSent) return;
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Single student found",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
