## Projects Structure

Here in the root there is a projects folder. In that folder we will be keeping different application. For now there are two applications one is gintaa-old and other one gintaa. gintaa-old is our old application and gintaa is new application where we will work. To keep gintaa-old application, we will be helpful to copy some code from that application and paste it in our gintaa application.

# About gintaa application folder structure

In the gintaa/src/app folder there are only 4 main folders are there. configs, core, modules and shared.

# configs

This folder will contain all the configuration of our application like enums, api-urls, constants etc.

# core

This folder is basically hold the core functionlities of the application. This folder contain some folders like guards,interceptors, services etc. 
In the service folder we will keeping only core/architectural services like authenticaion service, logger service etc.

# Modules

In this folder all the modules will be containing of our application like offer, deal, dashboard etc. And each of the modules will contain components, services, models folders. Which will be tighty coupled with this module only.

# Shared

In the shared module component, directives, services folder will be there. This folder will have only sharable functionalites..



### Commands 
## Generate module in angular application

ng g module modules/{moduleName} --routing --project gintaa

## Generate component in angular-new application

ng g c components/{componentName} --module modules/{moduleName} --project gintaa

