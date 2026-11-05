import { redirect } from 'next/navigation';

/** /students/ mirrors the original directory link → student dashboard. */
export default function StudentsIndex() {
  redirect('/students/student-dashboard/');
}
