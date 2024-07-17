
// Components
import { Toaster } from 'sonner';
import { InputForm } from './components/InputForm';
import { UserTable } from './components/UserTable';
import { useAppSelector } from './hooks/store'; 
import { UserProvider } from './context/userToEdit';

function App() {
  // const [users, setUsers] = useState<ListOfUser>(usersMock)

  const users = useAppSelector((state)=> state.users)

  return (
    <main style={{
      display:'flex',
      justifyContent:'center',
      marginTop: '10px'
    }}>
      <UserProvider >
        <InputForm/>
        <UserTable users={users}/>
        <Toaster 
          position="top-center" 
          expand={true}
          richColors/>
      </UserProvider>
    </main>
  )
}

export default App
