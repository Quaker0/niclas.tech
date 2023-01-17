import { App, Environment } from "aws-cdk-lib";

import StaticAppStack from "./lib/staticAppStack";

const app = new App();
const westEnv: Environment = { account: "491268129897", region: "us-east-1" };

new StaticAppStack(app, "S3Stack", { env: westEnv });
