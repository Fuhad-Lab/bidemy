'use client';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import LockResetIcon from '@mui/icons-material/LockReset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';
import type { ShellNavLink } from '@/components/relationship/SectionShell';
import {
  REGISTRAR_ADD,
  REGISTRAR_HOME,
  REGISTRAR_SEARCH,
  REGISTRAR_VIEW,
  STUDENT_GRADE,
  STUDENT_HOME,
  STUDENT_PASS,
  TEACHER_CLASSES,
  TEACHER_HOME,
  TEACHER_STUDENT_GRADE,
  TEACHER_STUDENTS,
} from '@/components/relationship/routes';

/**
 * Sidebar links for each role — mirrors the link lists of
 * Student/inc/navbar.php, Teacher/inc/navbar.php and the RegistrarOffice
 * buttons, shared so every page of a role shows the identical sidebar.
 */

export const REGISTRAR_NAV_LINKS: ShellNavLink[] = [
  { label: 'Dashboard', href: REGISTRAR_HOME, icon: <GroupIcon fontSize="small" /> },
  { label: 'Add Student', href: REGISTRAR_ADD, icon: <PersonAddIcon fontSize="small" /> },
  { label: 'Search Students', href: REGISTRAR_SEARCH, icon: <SearchIcon fontSize="small" /> },
  { label: 'View Student', href: REGISTRAR_VIEW, icon: <PersonSearchIcon fontSize="small" /> },
];

export const STUDENT_NAV_LINKS: ShellNavLink[] = [
  { label: 'Dashboard', href: STUDENT_HOME, icon: <PersonIcon fontSize="small" /> },
  { label: 'Grade Summary', href: STUDENT_GRADE, icon: <MenuBookIcon fontSize="small" /> },
  { label: 'Change Password', href: STUDENT_PASS, icon: <LockResetIcon fontSize="small" /> },
];

export const TEACHER_NAV_LINKS: ShellNavLink[] = [
  { label: 'Dashboard', href: TEACHER_HOME, icon: <PersonIcon fontSize="small" /> },
  { label: 'Classes', href: TEACHER_CLASSES, icon: <MenuBookIcon fontSize="small" /> },
  { label: 'Students', href: TEACHER_STUDENTS, icon: <GroupsIcon fontSize="small" /> },
  { label: 'Students Grade', href: TEACHER_STUDENT_GRADE, icon: <AssignmentIndIcon fontSize="small" /> },
];
