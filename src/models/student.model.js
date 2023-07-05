'use strict';

const Student = (sequelize, DataTypes) => {
  const StudentModel = sequelize.define('student', {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    grades: {
      type: DataTypes.JSON,
      validate: {
        Grades(value) {
          if (typeof value !== 'object') {
            throw new Error('The grades must be an object');
          }
          const subjects = ['math', 'english', 'chemistry', 'physics'];
          const allowedSubjects = new Set(subjects);
          for (const subject in value) {
            if (!allowedSubjects.has(subject)) {
              throw new Error(`${subject} is not a valid subject`);
            }
            if (typeof value[subject] !== 'number') {
              throw new Error(`${subject} grade must be a number`);
            }
          }
        }
      }
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return StudentModel;
};

module.exports = Student