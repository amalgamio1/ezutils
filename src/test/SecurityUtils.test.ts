import {describe, expect, test} from '@jest/globals';
import {SecurityUtils, StringUtils} from "../main";

/*
  @see https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html
*/
describe("SecurityUtils module", () => {

  const expectedEncPolicy = "eyAiZXhwaXJhdGlvbiI6ICIyMDE1LTEyLTMwVDEyOjAwOjAwLjAwMFoiLA0KICAiY29uZGl0aW9ucyI6IFsNCiAgICB7ImJ1Y2tldCI6ICJzaWd2NGV4YW1wbGVidWNrZXQifSwNCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXNlci91c2VyMS8iXSwNCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LA0KICAgIHsic3VjY2Vzc19hY3Rpb25fcmVkaXJlY3QiOiAiaHR0cDovL3NpZ3Y0ZXhhbXBsZWJ1Y2tldC5zMy5hbWF6b25hd3MuY29tL3N1Y2Nlc3NmdWxfdXBsb2FkLmh0bWwifSwNCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiaW1hZ2UvIl0sDQogICAgeyJ4LWFtei1tZXRhLXV1aWQiOiAiMTQzNjUxMjM2NTEyNzQifSwNCiAgICB7IngtYW16LXNlcnZlci1zaWRlLWVuY3J5cHRpb24iOiAiQUVTMjU2In0sDQogICAgWyJzdGFydHMtd2l0aCIsICIkeC1hbXotbWV0YS10YWciLCAiIl0sDQoNCiAgICB7IngtYW16LWNyZWRlbnRpYWwiOiAiQUtJQUlPU0ZPRE5ON0VYQU1QTEUvMjAxNTEyMjkvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LA0KICAgIHsieC1hbXotYWxnb3JpdGhtIjogIkFXUzQtSE1BQy1TSEEyNTYifSwNCiAgICB7IngtYW16LWRhdGUiOiAiMjAxNTEyMjlUMDAwMDAwWiIgfQ0KICBdDQp9"
  const expectedSignature = "8afdbf4008c03f22c2cd3cdb72e4afbb1f6a588f3255ac628749a66d7f09699e"
  const AWSAccessKeyId = "AKIAIOSFODNN7EXAMPLE"
  const AWSSecretAccessKey = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

  const policyStr = '{ "expiration": "2015-12-30T12:00:00.000Z",\n' +
    '  "conditions": [\n' +
    '    {"bucket": "sigv4examplebucket"},\n' +
    '    ["starts-with", "$key", "user/user1/"],\n' +
    '    {"acl": "public-read"},\n' +
    '    {"success_action_redirect": "http://sigv4examplebucket.s3.amazonaws.com/successful_upload.html"},\n' +
    '    ["starts-with", "$Content-Type", "image/"],\n' +
    '    {"x-amz-meta-uuid": "14365123651274"},\n' +
    '    {"x-amz-server-side-encryption": "AES256"},\n' +
    '    ["starts-with", "$x-amz-meta-tag", ""],\n' +
    '\n' +
    '    {"x-amz-credential": "AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request"},\n' +
    '    {"x-amz-algorithm": "AWS4-HMAC-SHA256"},\n' +
    '    {"x-amz-date": "20151229T000000Z" }\n' +
    '  ]\n' +
    '}';

  test("isNotNull `null`", () => {
    expect(StringUtils.isNotNull(null)).toBe(false);
  });


  /**
   * Note JSON.stringify of object does not work for AWS example because
   * the conversion removes tabs and newlines resulting in unequal hashes.
   * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html
   */
  test(`stringToSign, signingKey and signature`, () => {
    //  Base64-encoded version of this POST policy. You use this value as your StringToSign in signature calculation.
    const stringToSign = StringUtils.encodeBase64(policyStr)
    const signingKey = SecurityUtils.getAWS4SigningKey({
      secret_key: AWSSecretAccessKey,
      short_date: "20151229",
      region: "us-east-1"
    })

    expect(stringToSign).toBe(expectedEncPolicy);
    const signature = SecurityUtils.hmacSha256Hex(signingKey, stringToSign)
    expect(signature).toBe(expectedSignature);
  });


});