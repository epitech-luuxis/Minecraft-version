import getJsonMinecraft from './utils/getJsonMinecraft.js';

(async () => {
    let minecraft = await getJsonMinecraft();
    console.log(minecraft);

})()