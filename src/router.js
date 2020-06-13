import Index from './pages/index/index';
import Processed from './pages/processed/index';
const router = [
    {
        name:'首页',
        path:'/',
        component:Index
    },
    {
        name:'待处理订单',
        path:'/processed',
        component: Processed
    }
]
export default router;