import Header from './header'
import Footer from './footer'
import { useAuth } from '../../lib/authContext'
import FrontPage from './frontpage'
type Props = {
    children: React.ReactNode;
};

export default function Layout({children} : Props){
    const {user, username} = useAuth();
    

    return (
        <>
        <div className=" h-16 ">
            {username && (
            <Header>{children}</Header>
            )}
            {!username && (
                <FrontPage>{children}</FrontPage> 
            )}
        </div>
        </>
    );
}