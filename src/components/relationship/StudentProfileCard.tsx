'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import {
  classLabel,
  gradeLabel,
  getSectionById,
  type Student,
} from '@/data/relationship/demo-data';

/**
 * Port of the student profile card used by Student/index.php and
 * RegistrarOffice/student-view.php (card with img top + list-group-flush).
 */

interface StudentProfileCardProps {
  student: Student;
  footer?: React.ReactNode;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <ListItem disableGutters divider sx={{ py: 1 }}>
      <Typography component="span" variant="body2" color="text.secondary" sx={{ width: 150, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </ListItem>
  );
}

export default function StudentProfileCard({ student, footer }: StudentProfileCardProps) {
  const section = getSectionById(student.section);
  return (
    <Card sx={{ width: '100%' }}>
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          bgcolor: student.gender === 'Female' ? 'rgba(214, 51, 108, 0.08)' : 'rgba(13, 110, 253, 0.08)',
        }}
      >
        <Avatar
          sx={{
            width: 96,
            height: 96,
            bgcolor: student.gender === 'Female' ? '#d6336c' : '#0d6efd',
          }}
        >
          <PersonIcon sx={{ fontSize: 56 }} />
        </Avatar>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
          @{student.username}
        </Typography>
      </Box>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <List disablePadding>
          <Row label="First name:" value={student.fname} />
          <Row label="Last name:" value={student.lname} />
          <Row label="Username:" value={student.username} />
          <Row label="Address:" value={student.address} />
          <Row label="Date of birth:" value={student.date_of_birth} />
          <Row label="Email address:" value={student.email_address} />
          <Row label="Gender:" value={student.gender} />
          <Row label="Date of joined:" value={student.date_of_joined} />
          <Row label="Grade:" value={gradeLabel(student.grade)} />
          <Row label="Section:" value={section ? section.section : '—'} />
          <Row label="Class:" value={classLabel(student.grade, student.section)} />
          <Divider sx={{ my: 1.5 }} />
          <Row label="Parent first name:" value={student.parent_fname} />
          <Row label="Parent last name:" value={student.parent_lname} />
          <Row label="Parent phone number:" value={student.parent_phone_number} />
        </List>
        {footer}
      </CardContent>
    </Card>
  );
}
