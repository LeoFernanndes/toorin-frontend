import { CreateBookForm } from "../components/CreateBookForm";
import { TopNavbar } from "../components/TopNavbar";



export const CreateBookLayout = (): JSX.Element => (
    <>
        <TopNavbar message="Mensagem"/>
        <CreateBookForm nomeDoBotao="Clique"/>
    </>
);