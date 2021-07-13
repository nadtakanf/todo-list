<p align="center">
  <a href="https://github.com/nadtakanf/todo-list">
    <img src="images/aws-community-builder.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Todo List API</h3>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

#### Todo API Architecture Diagram
<img src="/images/todo-arch-diagram.png"/>

This project is creating for a todo list backend API hosting on AWS Cloud that 100% Serverless.

#### Todo API Sequence Diagram
<img src="/images/sequence-diagram-todolist.png"/>

### Built With
This project is built with technologiest as below.
* [Serverless Framework](https://www.serverless.com/)
* [NodeJS](https://nodejs.org/en/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [DynamoDB Single Table Design](https://www.youtube.com/watch?v=Q6-qWdsa8a4)
* [Cognito Presignup Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html)
* [AWS SDK V3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
* [AWS Event Bridge](https://www.youtube.com/watch?v=28B4L1fnnGM)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Cognito JWT token](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)
* [AWS SNS](https://aws.amazon.com/sns/)
* [Github Action](https://github.com/features/actions)
* [Lambda log](https://lambdalog.js.org/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before we start, let install those plugin to make it happen!
* [AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nadtakanf/todo-list.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Deploy to AWS environment
   ```sh
   sls deploy -v --stage <stage> --aws-profile <aws-profile>
   ```

<!-- USAGE EXAMPLES -->
## Getting JWT Token from Cognito

1. create a user on cognito console

2. Change password after create a user, otherwise you won't be able to get token API CLI
```sh
aws cognito-idp admin-set-user-password --user-pool-id <user_pool_id> --username <username> --password <password> --profile <aws-profile> --region us-west-1 --permanent
```

3. Run command below on your terminal to get jwt access token
```sh
aws cognito-idp admin-initiate-auth --user-pool-id <user_pool_id> --client-id <client_id>" --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME="<username>",PASSWORD="<password>" --profile <aws-profile> --region us-west-1
```

4. Copy idToken and use that on postman header name Authorization

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://trello.com/b/GVyty9tX/todo-web-development) for a list of proposed features (and known issues).

<!-- CONTACT -->
## Contact

Nadtakan Futhoem - [@nadtakanf](https://twitter.com/NadtakanF) - nadtakan.futhoem@gmail.com - [Medium](https://nadtakan-futhoem.medium.com/)

Project Link: [https://github.com/nadtakanf/todo-list](https://github.com/nadtakanf/todo-list)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [AWS WAF](https://aws.amazon.com/waf)
* [Route 53](https://aws.amazon.com/route53/)
* [CloudFront](https://aws.amazon.com/cloudfront/)
* [Decoupling serverless workloads with Amazon EventBridge](https://www.youtube.com/watch?v=VI79XQW4dIM)
* [Cognito JWT Token](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/admin-set-user-password.html)