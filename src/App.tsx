
// Components
import { InputForm } from './components/InputForm';
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
      <InputForm/>
    </main>
  )
}

export default App
