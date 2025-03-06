# Welcome

This is a result of a Tech Test

## Get started
1. Create a auth-config.js file with the following content:
```bash
   const config = {
    clientId: "<YOUR_CLIENTID",
    domain: "<YOUR_DOMAIN>",
    secret: "<YOUR_SECRET>"
  };
  
  export default config;
   ```
2. Complete the finhub-config.ts as follows:
   ```bash
   import { FinhubConfigs } from "./interfaces/FinhubConfigs";
   const config: FinhubConfigs = {
       apiId: "<YOUR_APPID>", // add you finhub app id here!
       socket: "wss://ws.finnhub.io"
     };
     
     export default config;
   ```
3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
    npx expo start
   ```
   
With those steps the app might run!

## Credits

Jesus Herrera!
