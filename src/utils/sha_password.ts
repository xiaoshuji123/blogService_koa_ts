import crypto from 'crypto';
/* 这种加密方式比md5更为安全 */
function sha256Password(password: string) {
  // password必须字符串类型
  const hash = crypto.createHash('sha256');
  return hash.update(password).digest('hex');
}

export default sha256Password;
