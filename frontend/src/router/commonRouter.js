import LoginPage from '../components/common/LoginPage'
import CreateAccountPage from '../components/common/CreateAccountPage'
import ChangePassword from '../components/common/ChangePassword'

export default [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
      },
      {
        path: '/createaccount',
        name: 'CreateAccountPage',
        component: CreateAccountPage
      },
      {
        path: '/changepassword',
        name: 'ChangePassword',
        component: ChangePassword
      },
]