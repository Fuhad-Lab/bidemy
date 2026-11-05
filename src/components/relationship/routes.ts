/**
 * Route constants for the Student-Teacher-Relationship section.
 * Every href keeps a trailing slash, mirroring the original PHP URLs
 * (Student/index.php, Teacher/classes.php, RegistrarOffice/…).
 */

export const ROLE_CHOOSER_ROUTE = '/student-teacher-relationship/';

export const REGISTRAR_HOME = '/student-teacher-relationship/registrar-office/';
export const REGISTRAR_ADD = '/student-teacher-relationship/registrar-office/student-add/';
export const REGISTRAR_SEARCH = '/student-teacher-relationship/registrar-office/student-search/';
export const REGISTRAR_VIEW = '/student-teacher-relationship/registrar-office/student-view/';

export const STUDENT_HOME = '/student-teacher-relationship/student/';
export const STUDENT_GRADE = '/student-teacher-relationship/student/grade/';
export const STUDENT_PASS = '/student-teacher-relationship/student/pass/';

export const TEACHER_HOME = '/student-teacher-relationship/teacher/';
export const TEACHER_CLASSES = '/student-teacher-relationship/teacher/classes/';
export const TEACHER_STUDENTS = '/student-teacher-relationship/teacher/students/';
export const TEACHER_STUDENTS_OF_CLASS = '/student-teacher-relationship/teacher/students-of-class/';
export const TEACHER_STUDENT_GRADE = '/student-teacher-relationship/teacher/student-grade/';

/** student-view/?student_id=N — same query contract as the PHP page */
export function registrarViewHref(studentId: number): string {
  return `${REGISTRAR_VIEW}?student_id=${studentId}`;
}

/** students-of-class/?class_id=N */
export function studentsOfClassHref(classId: number): string {
  return `${TEACHER_STUDENTS_OF_CLASS}?class_id=${classId}`;
}

/** student-grade/?student_id=N */
export function studentGradeHref(studentId: number): string {
  return `${TEACHER_STUDENT_GRADE}?student_id=${studentId}`;
}
