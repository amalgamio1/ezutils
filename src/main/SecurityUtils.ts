import { createHmac } from "crypto";

// Signature calculation (AWS Signature Version 4)
// const kDate = createHmac('sha256', 'AWS4' + secret_key).update(short_date).digest();
// const kRegion = createHmac('sha256', kDate).update(region).digest();
// const kService = createHmac('sha256', kRegion).update('s3').digest();
// const kSigning = createHmac('sha256', kService).update('aws4_request').digest();
// const signature = createHmac('sha256', kSigning).update(policyStr).digest('hex');
// @see https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html

export class SecurityUtils {

  /**
   * The properties: eventName = 'aws4_request' and service = 's3' by default
   * @param props {AWS4SigningKeyProps}
   */
  static getAWS4SigningKey(props: AWS4SigningKeyProps): Buffer {
    const {
      secret_key,
      short_date,
      region,
      eventName = 'aws4_request',
      service = 's3'
    } = props;
    const kDate = createHmac("sha256", "AWS4" + secret_key)
      .update(short_date)
      .digest();
    const kRegion = createHmac("sha256", kDate).update(region).digest();
    const kService = createHmac("sha256", kRegion).update(service).digest();
    return createHmac("sha256", kService).update(eventName).digest();
  }

  static hmacSha256Hex(signingKey: string | Buffer, stringToSign: string): string {
    return createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  }



}


export type AWS4SigningKeyProps = {
  secret_key: string;
  short_date: string;
  region: string;
  eventName?: string;
  service?: string;
}
