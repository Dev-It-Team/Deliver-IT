import { User } from '@/interfaces/IUser';
import router from './index'

function redirectUser(user: User) {
    switch (user.UserFlag.toString()) {
        case '1':
            router.push({ name: 'RestaurantHome', query: { redirect: '/restaurants' } });
            break;

        case '2':
            router.push({ name: 'DeliveryHome', query: { redirect: '/deliveries' } });
            break;

        default:
            router.push({ name: 'ClientHome', query: { redirect: '/clients' } });
            break;
    }
}

export default redirectUser;