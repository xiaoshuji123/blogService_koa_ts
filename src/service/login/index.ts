import { connect } from 'src/app/database';
import { User } from './type';

export const findUserByName = async function (name: string): Promise<User> {
  const statement = 'SELECT * FROM user WHERE name = ?';
  const [res] = await connect.execute(statement, [name]);
  return res[0];
};
