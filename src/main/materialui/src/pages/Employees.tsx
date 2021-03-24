import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';

interface EmployeeProps {
  text?: string;
  className?: string;
};

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  organization: string;
  role: string;
}

export default function Employees(props: EmployeeProps) {
  const theme = useTheme();
  const [rows, setRows] = useState([] as Employee[]);
  useEffect(() => {
    if (rows.length === 0)
      setRows([
        { id: '0', firstName: 'Matt', lastName: 'Mercer', organization: 'Critical Role', role: 'Dungeon Master'},
        { id: '1', firstName: 'Laura', lastName: 'Bailey', organization: 'Critical Role', role: 'Cleric' },
        { id: '2', firstName: 'Travis', lastName: 'Willingham', organization: 'Critical Role', role: 'Warlock' },
        { id: '3', firstName: 'Philip', lastName: 'Defranco', organization: 'Rogue Rocket', role: 'Host' },
        { id: '4', firstName: 'Liam', lastName: 'O\'Brian', organization: 'Critical Role', role: 'Wizard' },
      ]);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ height: 800 }}>
        <Paper style={{ padding: theme.spacing(4)}}>
          <Typography variant="h2" component="h2" style={{ paddingBottom: theme.spacing(2)}}>Employees</Typography>
          <div style={{ height: 400 }}>
            <DataGrid rows={rows} columns={[
              { field: 'id', headerName: 'ID' },
              { field: 'firstName', headerName: 'First Name', width: 130 },
              { field: 'lastName', headerName: 'Last Name', width: 130 },
              { field: 'organization', headerName: 'Organization', width: 200 },
              { field: 'role', headerName: 'Role', width: 130 },
            ]} checkboxSelection pageSize={5} />
          </div>
        </Paper>
      </Grid>
    </Grid>);

}