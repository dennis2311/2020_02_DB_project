import AdminPage from '../components/admin/AdminPage'
import TaskCreate from '../components/admin/TaskCreate'
import TaskManage from '../components/admin/TaskManage'
import TaskStatistics from '../components/admin/TaskStatistics'
import MemberManage from '../components/admin/MemberManage'

export default [
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage
      },
      {
        path: '/admin/taskcreate',
        name: 'TaskCreate',
        component: TaskCreate
      },
      {
        path: '/admin/taskmanage',
        name: 'TaskManage',
        component: TaskManage
      },
      {
        path: '/admin/taskstatistics',
        name: 'TaskStatistics',
        component: TaskStatistics
      },
      {
        path: '/admin/membermanage',
        name: 'MemberManage',
        component: MemberManage
      },
]