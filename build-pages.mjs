import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const origin=process.env.DAM_API_ORIGIN||'https://the-dam-village.yuyaoguo.workers.dev';
if(new URL(origin).protocol!=='https:')throw Error('Use an HTTPS backend origin');
await mkdir('docs',{recursive:true});let page=await readFile('index.html','utf8');page=page.replace(/<meta name="dam-api-origin" content="[^"]*">/,()=>'<meta name="dam-api-origin" content="'+origin+'">');await writeFile('docs/index.html',page);await writeFile('docs/.nojekyll','');for(const file of ['styles.css','qrcode.js','app.js'])await copyFile(file,'docs/'+file);console.log('GitHub Pages frontend ready. Server origin must allow this account’s github.io origin.');
