import React, { useEffect, useState } from "react";
import axios from 'axios';
import { User } from "../common/types";
import { DataGrid, GridCallbackDetails, GridRowParams, MuiEvent } from "@mui/x-data-grid";
import { dataStates, userListColumns } from "../common/constants";
import '../App.css';
import LoadingComponent from "../common/Components/Loading";
import ErrorComponent from "../common/Components/Error";
import EmptyComponent from "../common/Components/Empty";
import { useNavigate } from "react-router-dom";

function List() {
  const [allUsers, setAllUsers] = useState<readonly User[]>([]);
  const [dataStatus, setDataStatus] = useState<String>(dataStates.loading);
  const navigate = useNavigate();

  function fakeDelay(milliseconds: number) {
    return new Promise( resolve => setTimeout(resolve, milliseconds) );
  }

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get('http://localhost:3001/users');
        // Purely to show that I am showing the spinner when awaiting data
        await fakeDelay(2000);
        if(Array.isArray(response.data)) setAllUsers(response.data)
        !response.data.length ? setDataStatus(dataStates.empty) : setDataStatus(dataStates.ready)
      } catch (error) {
        setDataStatus(dataStates.error)
        console.error(error);
      }
    }

    getAllUsers();
  }, []);

  function handleClick(params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) {
    navigate(`/users/${params.row.id}`)
  }


  switch(dataStatus) {
    case dataStates.ready:
      return (
        <div className="ListParent">
          <DataGrid
            columns={userListColumns}
            rows={allUsers}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={dataStatus === dataStates.loading}
            onRowClick={handleClick}
          />
        </div>
      )
    case dataStates.empty:
      return (
        <EmptyComponent/>
      )
    case dataStates.error:
      return (
        <ErrorComponent/>
      )
    default:
      return (
        <LoadingComponent/>
      )
  }
}

export default List;