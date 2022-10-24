import Header from './header'
import Footer from './footer'
import { useAuth } from '../../lib/authContext'
import FrontPage from './frontpage'
type Props = {
    children: React.ReactNode;
};
import {Banner, Container} from '../styles/styles';


export default function Layout({children} : Props){
    const {user, username} = useAuth();
    

    return (
        <>
        <Banner>
        <div className=" h-16 ">
            {username && (
            <Header>{children}</Header>
            )}
            {!username && (
                <FrontPage>{children}</FrontPage> 
            )}
        </div>
        </Banner>
        </>
    );
}