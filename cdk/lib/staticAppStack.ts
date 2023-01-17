import * as s3 from "aws-cdk-lib/aws-s3";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import { PriceClass } from "aws-cdk-lib/aws-cloudfront";
import {
  Certificate,
  CertificateValidation,
  ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";

export default class StaticAppStack extends Stack {
  public readonly appBucket: s3.IBucket;
  public readonly cert: ICertificate;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.appBucket = new s3.Bucket(this, "niclasTechBucket", {
      bucketName: "niclas.tech",
      publicReadAccess: true,
      accessControl: s3.BucketAccessControl.PUBLIC_READ,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ["niclas.tech"],
        },
      ],
    });

    this.cert = new Certificate(this, "app-certificate", {
      domainName: "niclas.tech",
      certificateName: "niclas-tech-certificate",
      subjectAlternativeNames: ["wwww.niclas.tech"],
      validation: CertificateValidation.fromDns(),
    });

    new CloudFrontToS3(this, "staticCloudfrontS3", {
      existingBucketObj: this.appBucket,
      insertHttpSecurityHeaders: true,
      cloudFrontDistributionProps: {
        domainNames: ["niclas.tech"],
        priceClass: PriceClass.PRICE_CLASS_100,
        certificate: this.cert,
      },
    });
  }
}
