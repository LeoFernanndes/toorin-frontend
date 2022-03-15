import { TopNavbar } from "../components/TopNavbar";
import { BooksList } from '../components/BooksList';


export const HomeLayout = (): JSX.Element => (
    <>
        <TopNavbar message="Mensagem" />
        <BooksList />
    </>
);