import LoginForm from "../../components/LoginForm";
import { LoginFormContainer } from "./styled";


export const LoginLayout = (): JSX.Element => (
    <LoginFormContainer>
        <LoginForm />
    </LoginFormContainer>
);