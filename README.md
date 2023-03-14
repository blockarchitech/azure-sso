# azure-sso

The *only* reason this project exists is spite. I have spent 3 days trying to figure out how to login to the Advanced Managment Portal for my App Service Domain, and could not becasuse the link is gone, and the documentation is wrong. So I wrote this.

## What is this?

This is a simple Node.js app that will allow you to login to the Advanced Management Portal for your App Service Domain. It will then redirect you to the portal using SAML authentication.

## How do I use it?

1. Install the Azure CLI
2. `az login`
3. Get your Resource Group name and App Service Domain name, and your Azure Subscription ID handy.
4. Clone this repo
5. `npm install`
6. `node index.js`
7. Navigate to `http://localhost:3000`, and input the correct details.
8. Click "Submit"
9. You should be redirected. If you're not, check the terminal for errors and try again.

## Why would they remove the link?

According to a [Microsoft QNA thread I made](https://learn.microsoft.com/en-us/answers/questions/1188846/app-service-domain-cannot-view-advanced-management), It is because they are "working on a new experience". I have no idea what that means, but now it means you can't use your domain you just paid for.

## Contributing

If you want to contribute, please do. I don't really mess with SAML often, and I'm sure there are better ways to do this. I just wanted to get it working, and I'm sure there are better ways to do it.

## License

This project is licensed under no license! Do whatever you want with it. I don't care.