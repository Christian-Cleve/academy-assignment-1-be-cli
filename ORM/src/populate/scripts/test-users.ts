import { EntityManager } from 'typeorm';
import { Role } from '../../entity/auth/Role';
import { Profile } from '../../entity/auth/Profile';
import { createOrUseSupabaseUser } from '../util/user-utilities';
import { PopulateScriptExecutor } from '../util/types';

export const execute: PopulateScriptExecutor = async (manager: EntityManager) => {
  const authUser1 = await createOrUseSupabaseUser('test1@mail.dk', '12345678');
  const authUser2 = await createOrUseSupabaseUser('test2@mail.dk', '12345678');

 
  const adminProfile = new Profile();
  adminProfile.name = 'Bob';
  adminProfile.Lname = 'Dylan';
  adminProfile.email= authUser1.email;
  adminProfile.id = authUser1.id;

  await manager.save(adminProfile);

  const profile = new Profile();
  profile.name = 'Bob';
  profile.Lname = 'Marley';
  profile.email=authUser2.email;
  profile.id = authUser2.id;

  await manager.save(profile);
};
