'use client';

/**
 * To-Do list — port of todo-list.html. Add / complete / delete tasks,
 * persisted per subject in localStorage (original key: `teacherTodos`).
 * Seeded with demo tasks from the subject data module.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useLocalList } from './useLocalList';
import { DEMO_TODOS } from '@/data/teachers/demo-content';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListTool({ subject }: { subject: string }) {
  const seed = React.useMemo(
    () =>
      (DEMO_TODOS[subject] ?? [
        { id: 't-1', text: 'Plan this week’s lessons', completed: false },
        { id: 't-2', text: 'Mark last week’s assignments', completed: false },
      ]) as Todo[],
    [subject],
  );
  const [todos, setTodos] = useLocalList<Todo>(`fuhademy-teacherTodos-${subject}`, seed);
  const [draft, setDraft] = React.useState('');

  const addTodo = () => {
    const value = draft.trim();
    if (!value) return;
    setTodos((prev) => [{ id: `t-${Date.now()}`, text: value, completed: false }, ...prev]);
    setDraft('');
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        label="Add a new task…"
        placeholder="e.g. Mark SS2 assignments before Friday"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTodo();
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={addTodo} startIcon={<AddTaskIcon />}>
                  Add Task
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
        <TaskAltIcon fontSize="small" color="primary" />
        <Typography variant="body2" color="text.secondary">
          {todos.length === 0
            ? 'No tasks yet — add your first one above.'
            : `${todos.length} task${todos.length === 1 ? '' : 's'} · ${remaining} open`}
        </Typography>
      </Box>

      {todos.length > 0 && (
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 2,
            maxHeight: 380,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(45,59,69,0.25)',
              borderRadius: 4,
            },
          }}
        >
          <List dense disablePadding>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label={`Delete task: ${todo.text}`}
                    onClick={() =>
                      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
                    }
                    sx={{ color: '#d32f2f' }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                sx={{
                  bgcolor: todo.completed ? 'grey.100' : '#e3f2fd',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  pr: 7,
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() =>
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t,
                      ),
                    )
                  }
                  slotProps={{ input: { 'aria-label': `Mark task: ${todo.text}` } }}
                />
                <ListItemText
                  primary={todo.text}
                  primaryTypographyProps={{
                    sx: todo.completed
                      ? { textDecoration: 'line-through', color: '#888' }
                      : undefined,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
