import LoginPage from '../components/common/LoginPage'
import CreateAccountPage from '../components/common/CreateAccountPage'
import ChangePassword from '../components/common/ChangePassword'
import ChangeAccountInfo from '../components/common/ChangeAccountInfo'
import Signout from '../components/common/Signout'

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
      {
        path: '/changeaccountinfo',
        name: 'ChangeAccountInfo',
        component: ChangeAccountInfo
      },
      {
        path: '/signout',
        name: 'Signout',
        component: Signout
      }
]