
// Components
import { UserTable } from './components/UserTable';
import { useAppSelector } from './hooks/store'; 

function App() {
  // const [users, setUsers] = useState<ListOfUser>(usersMock)

  const users = useAppSelector((state)=> state.users)

  return (
    <main style={{
      display:'flex',
      justifyContent:'center'
    }}>
      <UserTable users={users}/>
    </main>
  )
}

export default App
