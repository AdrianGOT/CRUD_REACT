import { TextInput, Button, Card, Title } from '@tremor/react';

export const InputForm = () => {
    const handleSubmit = (event:React.ChangeEvent<HTMLFormElement>)=> {
        console.log(event);
        
    }

    return (
        <Card>
            <Title>Create new user</Title>
            <form onSubmit={handleSubmit}>
               <TextInput 
                    placeholder='type name' />

                <TextInput 
                    placeholder='type email' />
                
                <TextInput 
                    placeholder='type github nickname' />

                <Button type='submit'> Add new user </Button>
            </form>
        </Card>
    )
}