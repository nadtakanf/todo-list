# todo-list

sls invoke -f function --stage stage --aws-profile nadtakan

serverless logs -f function -t --aws-profile nadtakan

## Terms and Concept
aws cognito-idp admin-initiate-auth --user-pool-id "us-west-1_Tmd1WMbrJ" --client-id "jvn10anvdi6uc3kcj4qbnn867" --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME="nadtakan",PASSWORD="Abcd111&&" --profile nadtakan --region us-west-1

change password after create a user, otherwise you won't be able to get token API CLI
aws cognito-idp admin-set-user-password --user-pool-id us-west-1_Tmd1WMbrJ --username nadtakan --password "Abcd111&&" --profile nadtakan --region us-west-1 --permanent

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/admin-set-user-password.html