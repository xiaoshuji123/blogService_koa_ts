import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// 生成密钥对
export const generateKey = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // 模数长度，一般选择 2048 或以上
    publicKeyEncoding: {
      type: 'spki', // 公钥编码格式
      format: 'pem', // 公钥输出格式
    },
    privateKeyEncoding: {
      type: 'pkcs8', // 私钥编码格式
      format: 'pem', // 私钥输出格式
    },
  });
  fs.writeFileSync(path.join(__dirname, 'public.key'), publicKey);
  fs.writeFileSync(path.join(__dirname, 'private.key'), privateKey);
};
