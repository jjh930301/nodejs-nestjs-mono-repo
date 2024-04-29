import { createCipheriv } from 'crypto';

export function encodeAES(text: string, key: string): string {
  const iv = Buffer.from([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
  ]);
  // 키를 UTF-8 인코딩으로 변환하여 32바이트로 만듭니다.
  const keyBuffer = Buffer.from(key, 'utf-8');
  // AES-256-CBC 암호화 객체 생성
  const cipher = createCipheriv('aes-256-cbc', keyBuffer, iv);
  // 텍스트를 암호화하고 Base64로 인코딩하여 반환
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}
