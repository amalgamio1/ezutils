
class SecurityUtil {
  static async hmacBuilder(secret) {
    const {createHmac} = await import('crypto');
    return ({
      hmac_sha256_base64: (aString) => createHmac('sha256', secret).digest('base64', aString),

      hmac_sha256_hex: (aString) => createHmac('sha256', secret).digest('hex', aString),
    })
  }

}
