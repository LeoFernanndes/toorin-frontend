import { UserCreateUpdateFormContainer } from "../components/UserCreateUpdateFormContainer";
import { TopNavbar } from "../components/TopNavbar";


export const UserUpdateLayout = (): JSX.Element => (
    <>
        <TopNavbar />
        <UserCreateUpdateFormContainer />
    </>
);