import LoginPage from '../components/common/LoginPage'
import CreateAccountPage from '../components/common/CreateAccountPage'

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
]