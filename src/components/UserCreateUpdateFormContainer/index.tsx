import { TopNavbar } from "../TopNavbar";
import UserCreateUpdateForm from "./UserCreateUpdateForm";
import { UserCreateUpdateFormProps } from "./UserCreateUpdateForm";



export const UserCreateUpdateFormContainer = (): JSX.Element => {
  var props: UserCreateUpdateFormProps

  let authApiResponse = JSON.parse(localStorage.getItem('authApiResponse')!)
  if (authApiResponse != undefined){
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
          <UserCreateUpdateForm {...props} />
        </>
    )
};