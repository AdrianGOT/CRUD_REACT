import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

import { ListOfUserWithId } from '../interfaces/users';
import { DeleteIcon } from './icons/DeleteIcon';
import { EditIcon } from './icons/EditIcon';
import { useUserActions } from '../hooks/useUserActions';
import { useEditInput } from '../hooks/useEditInput';


interface Props {
    users: ListOfUserWithId
}


export const UserTable: React.FC<Props> = ({ users }) => {
  const { removeUser } = useUserActions();
  const { setUserToEdit } = useEditInput();

  return (
        <Card style={{
          maxWidth: '90%',
        }}>
          <h3 >Users 
            <Badge style={{marginLeft: '8px'}}>{users.length}</Badge> 
          </h3>
          <Table >
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>NAME</TableHeaderCell>
                <TableHeaderCell>EMAIL</TableHeaderCell>
                <TableHeaderCell>ACTIONS</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(({id, name, email, github}) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <img 
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                      }}
                      src={`https://unavatar.io/github/${github}`} 
                      alt={name} />
                    {name}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                   
                    <button onClick={()=> setUserToEdit({id, name, email, github})}>
                      <EditIcon/>
                    </button>
                   
                    <button onClick={()=> removeUser(id)}>
                      <DeleteIcon/>
                    </button>

                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
    )
};