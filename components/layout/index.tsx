import Header from './header'
import Footer from './footer'
import { useAuth } from '../../lib/authContext'

type Props = {
    children: React.ReactNode;
};

export default function Layout({children} : Props){
    const {username} = useAuth();


    return <div className="flex flex-col min-h-screen container mx-auto md:w-11/12  lg:w-4/5
    divide-y divide-black-500">
        <div className=" h-16 ">
            {username && (
            <Header />
            )}
            {!username && (
                <a>
                <span className="sr-only">Workflow</span>
                <img className="mt-4 h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
                </a>
            )}
        </div>
        <div className="flex-grow">
            {children}
        </div>
        <Footer />

    </div>
}