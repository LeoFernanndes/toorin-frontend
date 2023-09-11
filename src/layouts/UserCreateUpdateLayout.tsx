import { TopNavbar } from "../components/TopNavbar";
import UserCreateUpdateForm from "../components/UserUpdateForm";
import { UserCreateUpdateFormProps } from "../components/UserUpdateForm";



export const UserCreateUpdateLayout = (): JSX.Element => {
  var props: UserCreateUpdateFormProps

  let authApiResponse = JSON.parse(localStorage.getItem('authApiResponse')!)
  if (authApiResponse.user !== null ){
    props = {
      updateProps: {
        userId: authApiResponse.user.id,
        submitButtonText: "Update"
      },
      action: "update"
    }
  } else {
    props =  {
      createProps: {
        submitButtonText: "Create"
      },
      action: "create"
    }
  }

    return (
        <>
          <TopNavbar message="Mensagem"/>
          <UserCreateUpdateForm {...props} />
        </>
    )
};