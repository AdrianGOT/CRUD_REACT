import { TextInput, Button, Card, Title, Badge } from '@tremor/react';
import { User } from '../interfaces/users';
import { useUserActions } from '../hooks/useUserActions';
import { useEffect, useState } from 'react';
import { useEditInput } from '../hooks/useEditInput';

export const InputForm = () => {
    const [ result, setResult ] = useState<'ok' | 'ko'| null>(null); 
    const { userToEdit } = useEditInput();
    const { addUser, editUserRegisterd } = useUserActions();

    const [ isEditingUser, setIsEditingUser ] = useState<boolean>();
    
    useEffect(()=> {
        const isEditing = Object.entries(userToEdit).every(([, value]) => value.length > 0 );
        if(isEditing) setIsEditingUser(true);

    }, [userToEdit])
 
    
 
    const handleSubmit = (event:React.ChangeEvent<HTMLFormElement>)=> {
        event.preventDefault();

        setResult(null);

        const form = event.target;
        const formData = new FormData(form); 

        const newUser: User = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            github: formData.get('githubName') as string
        }

        if(!newUser.email || !newUser.name || !newUser.github ) {
            return setResult('ko');
        }
        
        if(isEditingUser){
            editUserRegisterd({
                ...newUser,
                id: userToEdit.id
            })
        }

        else addUser(newUser);

        setResult('ok');
        form.reset();
        
        setTimeout(()=> {
            setResult(null);
            setIsEditingUser(false);
        }, 3000)
    }

    return (
        <Card>
            <Title>Create new user</Title>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
               <TextInput
                    placeholder='type name'
                    name='name'
                    value={userToEdit.name} />

                <TextInput 
                    placeholder='type email'
                    name='email'
                    type='email' 
                    value={userToEdit.email}/>
                
                <TextInput 
                    placeholder='type github nickname'
                    name='githubName' 
                    value={userToEdit.github}/>

                <Button type='submit'> 
                    {isEditingUser?  'Edit User' : 'Save User'} 
                </Button>
                <span>
                    {result === 'ko' && <Badge color='red'> There is an error in the form </Badge>}
                    {result === 'ok' && <Badge color='green'> User created successfully! </Badge>}
                </span>
            </form>
        </Card>
    )
}