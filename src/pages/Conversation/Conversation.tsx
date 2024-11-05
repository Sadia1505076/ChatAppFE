import { useState, useEffect } from 'react'
import { fetchData } from '../../services/ApiService';
import { UserDto } from '../../dtos/User';
import './conversation.css'

function Conversation() {
    const [allChats, setAllChats] = useState<UserDto[] | null>(null);
    // const [followees, setFollowees] = useState<UserDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const loadAllChats = async () => {
        try {
            const result = await fetchData<UserDto[]>('/Follow/GetAllChats?currentUserEmail=sadia.tasnim@auptimate.com');
            console.log("all the chats:", result);
            setAllChats(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    // const loadAllFollowees = async () => {
    //     try {
    //         const result = await fetchData<UserDto[]>('/Follow/GetAllFollowees?email=sadia.tasnim@auptimate.com');
    //         setFollowees(result);
    //     } catch (err) {
    //         setError(err instanceof Error ? err.message : 'Unknown error');
    //     }
    // };

    useEffect(() => {
        loadAllChats();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h3>People You Follow:</h3>
            <div className='followeeContainer'>
                {allChats ? allChats.map(chat => (<span key={chat.email}>{chat.name + ", "}</span>)) : undefined}
            </div>
            {/* <h3>People Who Follow You:</h3>
            <div className='followeeContainer'>
                <div className='followeeContainer'>
                    {followees ? followees.map(follower => (<span>{follower.name + ", "}</span>)) : undefined}
                </div>
            </div> */}
        </div>
    );
}

export default Conversation;