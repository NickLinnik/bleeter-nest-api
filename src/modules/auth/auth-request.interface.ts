import { UserEntity } from '~modules/users/user.entity';

export interface AuthRequest {
  user: UserEntity;
}
