import { GridColDef } from '@mui/x-data-grid';

export const dataStates = {
  loading: "LOADING",
  ready: "READY",
  empty: "EMPTY",
  error: "ERROR"
}

export const userListColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'first_name', headerName: 'First name', width: 100 },
  { field: 'last_name', headerName: 'Last name', width: 100 }
];
