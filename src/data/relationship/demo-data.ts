/**
 * Demo dataset for the Student-Teacher-Relationship school admin app,
 * seeded from the original MySQL dump (sms_db.sql) shipped with the PHP
 * project at /home/z/fuhademy/student-teacher-relationship/.
 *
 * Frontend-only: everything here is plain data + a zustand store; there is no
 * backend/API/DB. IDs and shapes mirror the PHP schema (students, grades,
 * section, subjects, class, teachers, student_score, setting) so the pages
 * behave like the originals (e.g. grade codes like `G1-A`, results strings
 * like `70 100, 80 100`).
 */

export interface Grade {
  grade_id: number;
  grade: string;
  grade_code: string;
}

export interface Section {
  section_id: number;
  section: string;
}

export interface Subject {
  subject_id: number;
  subject: string;
  subject_code: string;
  grade: number;
}

export interface SchoolClass {
  class_id: number;
  grade: number;
  section: number;
}

export interface Student {
  student_id: number;
  username: string;
  password: string;
  fname: string;
  lname: string;
  grade: number;
  section: number;
  address: string;
  gender: 'Male' | 'Female';
  email_address: string;
  date_of_birth: string;
  date_of_joined: string;
  parent_fname: string;
  parent_lname: string;
  parent_phone_number: string;
}

export interface Teacher {
  teacher_id: number;
  username: string;
  password: string;
  class: string; // concatenation of class ids, as in the PHP schema
  fname: string;
  lname: string;
  subjects: string; // concatenation of subject ids
  address: string;
  employee_number: number;
  date_of_birth: string;
  phone_number: string;
  qualification: string;
  gender: 'Male' | 'Female';
  email_address: string;
  date_of_joined: string;
}

export interface RegistrarUser {
  r_user_id: number;
  username: string;
  fname: string;
  lname: string;
  role: string;
}

export interface StudentScore {
  id: number;
  semester: string;
  year: number;
  student_id: number;
  teacher_id: number;
  subject_id: number;
  results: string; // "70 100, 80 100, …" — same format as the PHP app
}

export interface Setting {
  id: number;
  current_year: number;
  current_semester: string;
  school_name: string;
  slogan: string;
  about: string;
}

export const GRADES: Grade[] = [
  { grade_id: 1, grade: '1', grade_code: 'G' },
  { grade_id: 2, grade: '2', grade_code: 'G' },
  { grade_id: 3, grade: '1', grade_code: 'KG' },
  { grade_id: 4, grade: '2', grade_code: 'KG' },
  { grade_id: 5, grade: '4', grade_code: 'G' },
  { grade_id: 6, grade: '3', grade_code: 'KG' },
  { grade_id: 7, grade: '3', grade_code: 'G' },
  { grade_id: 8, grade: '4', grade_code: 'KG' },
];

export const SECTIONS: Section[] = [
  { section_id: 1, section: 'A' },
  { section_id: 2, section: 'B' },
  { section_id: 3, section: 'C' },
  { section_id: 6, section: 'D' },
  { section_id: 7, section: 'E' },
];

export const CLASSES: SchoolClass[] = [
  { class_id: 1, grade: 7, section: 2 }, // G3-B
  { class_id: 2, grade: 1, section: 1 }, // G1-A
  { class_id: 3, grade: 3, section: 3 }, // KG1-C
  { class_id: 4, grade: 2, section: 1 }, // G2-A
  { class_id: 5, grade: 1, section: 2 }, // G1-B
  { class_id: 6, grade: 2, section: 2 }, // G2-B
  { class_id: 7, grade: 7, section: 1 }, // G3-A
];

export const SUBJECTS: Subject[] = [
  { subject_id: 1, subject: 'English', subject_code: 'En', grade: 1 },
  { subject_id: 2, subject: 'Physics', subject_code: 'Phy', grade: 2 },
  { subject_id: 3, subject: 'Biology', subject_code: 'Bio-01', grade: 1 },
  { subject_id: 4, subject: 'Math', subject_code: 'Math-01', grade: 1 },
  { subject_id: 5, subject: 'Chemistry', subject_code: 'ch-01', grade: 1 },
  { subject_id: 6, subject: 'Programming', subject_code: 'pro-01', grade: 1 },
];

export const TEACHER: Teacher = {
  teacher_id: 1,
  username: 'oliver',
  password: 'password123',
  class: '1234',
  fname: 'Oliver',
  lname: 'Noah',
  subjects: '1245',
  address: 'California, Los angeles',
  employee_number: 6546,
  date_of_birth: '2022-09-12',
  phone_number: '0945739',
  qualification: 'BSc',
  gender: 'Male',
  email_address: 'ol@ab.com',
  date_of_joined: '2022-09-09 05:23:45',
};

export const REGISTRAR: RegistrarUser = {
  r_user_id: 1,
  username: 'james',
  fname: 'James',
  lname: 'William',
  role: 'Registrar Office',
};

export const STUDENTS: Student[] = [
  {
    student_id: 1,
    username: 'john',
    password: 'password123',
    fname: 'John',
    lname: 'Doe',
    grade: 1,
    section: 1,
    address: 'California, Los angeles',
    gender: 'Male',
    email_address: 'abas55@ab.com',
    date_of_birth: '2012-09-12',
    date_of_joined: '2019-12-11 14:16:44',
    parent_fname: 'Doe',
    parent_lname: 'Mark',
    parent_phone_number: '09393',
  },
  {
    student_id: 3,
    username: 'abas',
    password: 'password123',
    fname: 'Abas',
    lname: 'A.',
    grade: 2,
    section: 1,
    address: 'Berlin',
    gender: 'Male',
    email_address: 'abas@ab.com',
    date_of_birth: '2002-12-03',
    date_of_joined: '2021-12-01 14:16:51',
    parent_fname: 'dsf',
    parent_lname: 'dfds',
    parent_phone_number: '7979',
  },
  {
    student_id: 4,
    username: 'jo',
    password: 'password123',
    fname: 'John3',
    lname: 'Doe',
    grade: 1,
    section: 1,
    address: 'California, Los angeles',
    gender: 'Female',
    email_address: 'jo@jo.com',
    date_of_birth: '2013-06-13',
    date_of_joined: '2022-09-10 13:48:49',
    parent_fname: 'Doe',
    parent_lname: 'Mark',
    parent_phone_number: '074932040',
  },
  {
    student_id: 5,
    username: 'jo2',
    password: 'password123',
    fname: 'Jhon',
    lname: 'Doe',
    grade: 1,
    section: 1,
    address: 'UK',
    gender: 'Male',
    email_address: 'jo2@jo.com',
    date_of_birth: '1990-02-15',
    date_of_joined: '2023-02-12 18:11:26',
    parent_fname: 'Doe',
    parent_lname: 'Do',
    parent_phone_number: '0943568654',
  },
  {
    student_id: 6,
    username: 'maria',
    password: 'password123',
    fname: 'Maria',
    lname: 'Lopez',
    grade: 1,
    section: 1,
    address: 'Lagos',
    gender: 'Female',
    email_address: 'maria@school.com',
    date_of_birth: '2011-04-02',
    date_of_joined: '2023-01-09 09:20:00',
    parent_fname: 'Ana',
    parent_lname: 'Lopez',
    parent_phone_number: '08033445566',
  },
  {
    student_id: 7,
    username: 'sara',
    password: 'password123',
    fname: 'Sara',
    lname: 'Ahmed',
    grade: 7,
    section: 2,
    address: 'Kano',
    gender: 'Female',
    email_address: 'sara@school.com',
    date_of_birth: '2009-11-23',
    date_of_joined: '2022-10-01 10:00:00',
    parent_fname: 'Musa',
    parent_lname: 'Ahmed',
    parent_phone_number: '08099887766',
  },
  {
    student_id: 8,
    username: 'kofi',
    password: 'password123',
    fname: 'Kofi',
    lname: 'Mensah',
    grade: 3,
    section: 3,
    address: 'Accra',
    gender: 'Male',
    email_address: 'kofi@school.com',
    date_of_birth: '2015-06-30',
    date_of_joined: '2023-03-15 08:45:00',
    parent_fname: 'Ama',
    parent_lname: 'Mensah',
    parent_phone_number: '07011223344',
  },
  {
    student_id: 9,
    username: 'amara',
    password: 'password123',
    fname: 'Amara',
    lname: 'Okafor',
    grade: 7,
    section: 2,
    address: 'Enugu',
    gender: 'Female',
    email_address: 'amara@school.com',
    date_of_birth: '2008-08-08',
    date_of_joined: '2021-09-06 11:30:00',
    parent_fname: 'Chidi',
    parent_lname: 'Okafor',
    parent_phone_number: '08155667788',
  },
  {
    student_id: 10,
    username: 'lily',
    password: 'password123',
    fname: 'Lily',
    lname: 'Chen',
    grade: 1,
    section: 1,
    address: 'Singapore',
    gender: 'Female',
    email_address: 'lily@school.com',
    date_of_birth: '2012-02-18',
    date_of_joined: '2022-08-15 09:10:00',
    parent_fname: 'Wei',
    parent_lname: 'Chen',
    parent_phone_number: '08022334455',
  },
  {
    student_id: 11,
    username: 'tom',
    password: 'password123',
    fname: 'Tom',
    lname: 'Becker',
    grade: 1,
    section: 1,
    address: 'Hamburg',
    gender: 'Male',
    email_address: 'tom@school.com',
    date_of_birth: '2013-10-05',
    date_of_joined: '2023-02-01 14:35:00',
    parent_fname: 'Karl',
    parent_lname: 'Becker',
    parent_phone_number: '01765544332',
  },
  {
    student_id: 12,
    username: 'nadia',
    password: 'password123',
    fname: 'Nadia',
    lname: 'Yusuf',
    grade: 2,
    section: 1,
    address: 'Kaduna',
    gender: 'Female',
    email_address: 'nadia@school.com',
    date_of_birth: '2010-07-21',
    date_of_joined: '2021-10-11 08:00:00',
    parent_fname: 'Aliyu',
    parent_lname: 'Yusuf',
    parent_phone_number: '08066554433',
  },
  {
    student_id: 13,
    username: 'emeka',
    password: 'password123',
    fname: 'Emeka',
    lname: 'Eze',
    grade: 7,
    section: 2,
    address: 'Abuja',
    gender: 'Male',
    email_address: 'emeka@school.com',
    date_of_birth: '2009-03-12',
    date_of_joined: '2022-09-19 12:20:00',
    parent_fname: 'Obi',
    parent_lname: 'Eze',
    parent_phone_number: '08123456789',
  },
  {
    student_id: 14,
    username: 'hana',
    password: 'password123',
    fname: 'Hana',
    lname: 'Kim',
    grade: 3,
    section: 3,
    address: 'Seoul',
    gender: 'Female',
    email_address: 'hana@school.com',
    date_of_birth: '2015-12-01',
    date_of_joined: '2023-04-03 10:15:00',
    parent_fname: 'Min',
    parent_lname: 'Kim',
    parent_phone_number: '01098765432',
  },
  {
    student_id: 15,
    username: 'yusuf',
    password: 'password123',
    fname: 'Yusuf',
    lname: 'Bello',
    grade: 1,
    section: 1,
    address: 'Sokoto',
    gender: 'Male',
    email_address: 'yusuf@school.com',
    date_of_birth: '2012-05-27',
    date_of_joined: '2023-01-23 09:45:00',
    parent_fname: 'Sani',
    parent_lname: 'Bello',
    parent_phone_number: '08099112233',
  },
  {
    student_id: 16,
    username: 'zainab',
    password: 'password123',
    fname: 'Zainab',
    lname: 'Ali',
    grade: 2,
    section: 1,
    address: 'Zaria',
    gender: 'Female',
    email_address: 'zainab@school.com',
    date_of_birth: '2011-09-14',
    date_of_joined: '2022-11-07 13:05:00',
    parent_fname: 'Ibrahim',
    parent_lname: 'Ali',
    parent_phone_number: '07055443322',
  },
];

export const STUDENT_SCORES: StudentScore[] = [
  { id: 1, semester: 'II', year: 2021, student_id: 1, teacher_id: 1, subject_id: 1, results: '10 15,15 20,10 10,10 20,30 35' },
  { id: 2, semester: 'II', year: 2023, student_id: 1, teacher_id: 1, subject_id: 4, results: '15 20,4 5' },
  { id: 3, semester: 'I', year: 2022, student_id: 1, teacher_id: 1, subject_id: 5, results: '10 20,50 50' },
  { id: 4, semester: 'II', year: 2023, student_id: 3, teacher_id: 1, subject_id: 4, results: '18 20,4 5,20 25' },
  { id: 5, semester: 'I', year: 2023, student_id: 4, teacher_id: 1, subject_id: 1, results: '12 15,8 10' },
  { id: 6, semester: 'I', year: 2023, student_id: 6, teacher_id: 1, subject_id: 4, results: '10 10,18 20' },
  { id: 7, semester: 'II', year: 2023, student_id: 7, teacher_id: 1, subject_id: 2, results: '25 30,15 20' },
  { id: 8, semester: 'I', year: 2023, student_id: 8, teacher_id: 1, subject_id: 1, results: '9 10,7 10' },
  { id: 9, semester: 'II', year: 2023, student_id: 9, teacher_id: 1, subject_id: 2, results: '20 30,10 20' },
  { id: 10, semester: 'I', year: 2023, student_id: 1, teacher_id: 1, subject_id: 1, results: '14 20,11 15' },
  { id: 11, semester: 'II', year: 2022, student_id: 1, teacher_id: 1, subject_id: 2, results: '22 30,12 20' },
  { id: 12, semester: 'I', year: 2023, student_id: 3, teacher_id: 1, subject_id: 5, results: '12 20,15 20' },
  { id: 13, semester: 'II', year: 2022, student_id: 3, teacher_id: 1, subject_id: 4, results: '10 20,8 10' },
  { id: 14, semester: 'II', year: 2023, student_id: 4, teacher_id: 1, subject_id: 4, results: '16 20,3 5' },
  { id: 15, semester: 'I', year: 2022, student_id: 4, teacher_id: 1, subject_id: 5, results: '8 20,7 15' },
  { id: 16, semester: 'II', year: 2023, student_id: 5, teacher_id: 1, subject_id: 1, results: '13 15,6 10' },
  { id: 17, semester: 'I', year: 2023, student_id: 5, teacher_id: 1, subject_id: 4, results: '9 20,2 5' },
  { id: 18, semester: 'II', year: 2023, student_id: 6, teacher_id: 1, subject_id: 5, results: '14 20,16 20' },
  { id: 19, semester: 'II', year: 2022, student_id: 6, teacher_id: 1, subject_id: 4, results: '12 20,14 20' },
  { id: 20, semester: 'I', year: 2023, student_id: 7, teacher_id: 1, subject_id: 1, results: '12 15,9 10' },
  { id: 21, semester: 'I', year: 2023, student_id: 7, teacher_id: 1, subject_id: 4, results: '15 20,18 25' },
  { id: 22, semester: 'II', year: 2023, student_id: 8, teacher_id: 1, subject_id: 5, results: '6 20,10 20' },
  { id: 23, semester: 'I', year: 2023, student_id: 9, teacher_id: 1, subject_id: 4, results: '19 20,20 25' },
  { id: 24, semester: 'II', year: 2023, student_id: 9, teacher_id: 1, subject_id: 1, results: '11 15,7 10' },
  { id: 25, semester: 'I', year: 2023, student_id: 10, teacher_id: 1, subject_id: 4, results: '17 20,4 5' },
  { id: 26, semester: 'I', year: 2023, student_id: 10, teacher_id: 1, subject_id: 1, results: '10 15,8 10' },
  { id: 27, semester: 'II', year: 2023, student_id: 11, teacher_id: 1, subject_id: 4, results: '20 20,5 5' },
  { id: 28, semester: 'I', year: 2023, student_id: 11, teacher_id: 1, subject_id: 5, results: '15 20,12 20' },
  { id: 29, semester: 'II', year: 2023, student_id: 12, teacher_id: 1, subject_id: 4, results: '11 20,10 15' },
  { id: 30, semester: 'I', year: 2023, student_id: 13, teacher_id: 1, subject_id: 1, results: '14 15,6 10' },
  { id: 31, semester: 'II', year: 2022, student_id: 13, teacher_id: 1, subject_id: 2, results: '18 30,15 20' },
  { id: 32, semester: 'II', year: 2023, student_id: 14, teacher_id: 1, subject_id: 5, results: '10 20,5 20' },
  { id: 33, semester: 'I', year: 2023, student_id: 15, teacher_id: 1, subject_id: 4, results: '13 20,9 15' },
  { id: 34, semester: 'II', year: 2023, student_id: 15, teacher_id: 1, subject_id: 1, results: '12 15,10 10' },
  { id: 35, semester: 'I', year: 2023, student_id: 16, teacher_id: 1, subject_id: 4, results: '16 20,11 15' },
  { id: 36, semester: 'II', year: 2023, student_id: 16, teacher_id: 1, subject_id: 5, results: '7 20,13 20' },
];

export const SETTING: Setting = {
  id: 1,
  current_year: 2023,
  current_semester: 'II',
  school_name: 'Y School',
  slogan: 'Lux et Veritas Light and Truth',
  about:
    'Y School is a demo school used by the Student-Teacher-Relationship management app. ' +
    'The registrar office registers students, teachers record scores per subject and ' +
    'students follow their grade summary — all in one place.',
};

/* ---------------- helpers (mirror the PHP data functions) ---------------- */

export function getGradeById(gradeId: number): Grade | undefined {
  return GRADES.find((g) => g.grade_id === gradeId);
}

export function getSectionById(sectionId: number): Section | undefined {
  return SECTIONS.find((s) => s.section_id === sectionId);
}

export function getSubjectById(subjectId: number): Subject | undefined {
  return SUBJECTS.find((s) => s.subject_id === subjectId);
}

export function getClassById(classId: number): SchoolClass | undefined {
  return CLASSES.find((c) => c.class_id === classId);
}

/** `G1-A` style label used across the original pages */
export function classLabel(gradeId: number, sectionId: number): string {
  const g = getGradeById(gradeId);
  const s = getSectionById(sectionId);
  if (!g || !s) return '—';
  return `${g.grade_code}-${g.grade}${s.section}`;
}

export function gradeLabel(gradeId: number): string {
  const g = getGradeById(gradeId);
  return g ? `${g.grade_code}-${g.grade}` : '—';
}

/** Port of gradeCalc() from Student/data/score.php — takes a 0–100 percent */
export function gradeCalc(percent: number): string {
  if (percent >= 92) return 'A+';
  if (percent >= 86) return 'A';
  if (percent >= 80) return 'A-';
  if (percent >= 75) return 'B+';
  if (percent >= 70) return 'B';
  if (percent >= 66) return 'B-';
  if (percent >= 60) return 'C';
  if (percent >= 55) return 'C-';
  if (percent >= 50) return 'D+';
  if (percent >= 45) return 'D';
  if (percent >= 40) return 'D-';
  if (percent < 39) return 'F';
  return 'F';
}

/** The student whose session is "logged in" for the Student area (john, G1-A) */
export const DEMO_STUDENT_ID = 1;

export function getStudentById(studentId: number): Student | undefined {
  return STUDENTS.find((s) => s.student_id === studentId);
}

export function formatStudentName(student: Student): string {
  return `${student.fname} ${student.lname}`;
}

/** Port of searchStudents() from RegistrarOffice/data/student.php */
export function searchStudents(key: string): Student[] {
  const k = key.trim().toLowerCase();
  if (!k) return [...STUDENTS];
  return STUDENTS.filter((s) => {
    const haystack = [
      s.fname,
      s.lname,
      s.username,
      s.email_address,
      String(s.student_id),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(k);
  });
}

/** Students belonging to a class (same grade + section) */
export function studentsInClass(cls: SchoolClass): Student[] {
  return STUDENTS.filter(
    (s) => s.grade === cls.grade && s.section === cls.section,
  );
}

/** Students enrolled in any of the demo teacher's classes */
export function studentsOfTeacherClasses(): Student[] {
  const ids = new Set(teacherClasses(TEACHER).map((c) => c.class_id));
  return STUDENTS.filter((s) =>
    teacherClasses(TEACHER).some(
      (c) =>
        ids.has(c.class_id) && s.grade === c.grade && s.section === c.section,
    ),
  );
}

/** Scores of one student, newest year first (mirrors getScoreById ordering) */
export function scoresForStudent(studentId: number): StudentScore[] {
  return STUDENT_SCORES.filter((sc) => sc.student_id === studentId).sort(
    (a, b) => b.year - a.year || a.id - b.id,
  );
}

/** Score of one student for one subject in the current year + semester */
export function findScoreRecord(
  studentId: number,
  subjectId: number,
): StudentScore | undefined {
  return STUDENT_SCORES.find(
    (sc) =>
      sc.student_id === studentId &&
      sc.subject_id === subjectId &&
      sc.teacher_id === TEACHER.teacher_id &&
      sc.semester === SETTING.current_semester &&
      sc.year === SETTING.current_year,
  );
}

/** Group score rows by school year, newest year first */
export function groupScoresByYear(
  scores: StudentScore[],
): Array<{ year: number; rows: StudentScore[] }> {
  const groups = new Map<number, StudentScore[]>();
  for (const sc of scores) {
    const list = groups.get(sc.year) ?? [];
    list.push(sc);
    groups.set(sc.year, list);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, rows]) => ({ year, rows }));
}

/** Totals of a results string: sum of scores, sum of outOf, percent */
export function scoreTotals(results: string): {
  total: number;
  outOf: number;
  percent: number | null;
} {
  const pairs = parseResults(results);
  const total = pairs.reduce((acc, p) => acc + p.score, 0);
  const outOf = pairs.reduce((acc, p) => acc + p.outOf, 0);
  return {
    total,
    outOf,
    percent: outOf > 0 ? Math.round((total / outOf) * 100) : null,
  };
}

/** Next free student id for the registrar add form */
export function nextStudentId(): number {
  return STUDENTS.reduce((max, s) => Math.max(max, s.student_id), 0) + 1;
}

/** Parse the `70 100, 80 100` results string into score/outOf pairs */
export function parseResults(results: string): Array<{ score: number; outOf: number }> {
  return results
    .split(',')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const parts = chunk.split(/\s+/).map(Number);
      return { score: parts[0] || 0, outOf: parts[1] || 0 };
    });
}

/** Subjects assigned to the demo teacher (subject ids concatenated in schema) */
export function teacherSubjects(teacher: Teacher): Subject[] {
  return teacher.subjects
    .split('')
    .map(Number)
    .map((id) => getSubjectById(id))
    .filter((s): s is Subject => Boolean(s));
}

/** Classes assigned to the demo teacher */
export function teacherClasses(teacher: Teacher): Array<SchoolClass & { label: string }> {
  return teacher.class
    .split('')
    .map(Number)
    .map((id) => getClassById(id))
    .filter((c): c is SchoolClass => Boolean(c))
    .map((c) => ({ ...c, label: classLabel(c.grade, c.section) }));
}
