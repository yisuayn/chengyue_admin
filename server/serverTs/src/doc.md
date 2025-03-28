| remark|  platform|    appId|   appkey|
|---|---|---|---|
| facpley抖音小程序域名验证 |   抖音    |   khizvRIv3I.txt  |    aac94035b164ae258ac70106362cd0bb   |
| 秀脸抖音小程序域名验证 |   抖音    |   vBzvZsgtqy.txt  |    97c1a3c6237f727c15df870b2266df16   |
| 百变face抖音小程序域名验证 |   抖音    |   BufjmALFpE.txt  |    45a6d8227a861231252eb0803294e118   |
| 她拍face抖音小程序域名验证 |   抖音    |   h6S71RsLHb.txt  |    02a63c2da3ce25eceb5ff6879f354688   |
| 开心拍抖音小程序域名验证 |   抖音    |  2RWeMzxBPj.txt   |   3c504e061e27195cfa4006cec42defa8    |
| 脸映抖音小程序域名验证 |   抖音    |  sPTrnYAgLp.txt   |   bac4ce7312be9f741ad09f0902397264    |
| 幸福拍抖音小程序域名验证 |   抖音    |   OXFRpa3Job.txt  |   64bebd15bda37ba993ad75bc44e8a504    |
| 千面男神抖音小程序域名验证 |   抖音    |   jAYGDsHYRJ.txt  |   a4e5b1e546138e7a44b7be21b5fe88f8    |
| 甜心拍抖音小程序域名验证 |   抖音    |  ZoM0dQAIsO.txt   |   af19d44e9f55abb54aabad9bf207955b    |
| 她face抖音小程序域名验证 |   抖音    |  0Bhg6UpdMD.txt   |   5fd3414be8b4f45ec467b01c00d42701    |
| 秀脸微信小程序（已下线） |   抖音    |  2Qme82nmkX.txt   |   abb3bbf3b125d620509684a6ae0a1d21    |
| 百变神颜抖音小程序 |   抖音    |  r5YWGF2pNS.txt   |   c7d1b61bc2581511c66b1daaeceb23c2    |
| 我的古装秀抖音小程序 |   抖音    |   Pj5x1s04t4.txt  |   fad45578e7a39546613a7284c2f4bf45    |
| 我的明星男友音小程序 |   抖音    |   jqeMycVeFD.txt  |   c1cbe61f1373cb2bbdcbcd884bbe8500    |
| 秋冬写真馆抖音小程序 |   抖音    |  F45mNpZImY.txt   |    a3300e607b9e06baca91cb1cd5504e26   |
| 偶像秀抖音小程序 |   抖音    |  pUIB9fRG7D.txt   |   dc8cc3f4beff870f475b677819da6fb3    |
| 婚纱照生成器抖音小程序 |   抖音    |   SrwboSbgbT.txt  |   48194d16d6174616de0235b9f163fabb    |
| 圣诞写真抖音小程序 |   抖音    |   HKlX1c0S54.txt  |  329e57cd65cc23098c91851de4dedb15     |
| styleart抖音小程序 |   抖音    |  anIm4Gv2im.txt   |   52bf27a2c5b85369e0431e826f184ac8    |
| draft绘画抖音小程序 |   抖音    |  hPjZDNVpmf.txt   |   866d6e0d4b95e92313eb8b9142b02cf2    |
| 意间AI作画抖音小程序 |   抖音    |   uEKwTTQ730.txt  |   e2343b812137a69d6b19037836c38d9a    |
| 意间AI绘画照片 |   抖音    |  ideNEBa5va.txt   |   04291d4efe5151c7af70c27f33087dd1    |
| 意间AI动漫脸抖音小程序 |   抖音    |  EAWTFG3n3k.txt   |   b7218c2c7e345acc1eede140d75dae45    |
| AI绘画制作神器抖音小程序 |   抖音    |  SJAXQzSpxD.txt   |   69e3a8b9e13d62e9dfffcc4da32acc26    |
| 漫画头像制作神器抖音小程序 |   抖音    |  1c9SBHzbJl.txt   |   508ecf9c1560571a574da52412173441    |
| styleart绘画抖音小程序 |   抖音    |  5NoT8M2YZe.txt   |   ae760e47b9a8f894977ad0bef7b559a2    |
| 快拍（开心拍）抖音小程序 |   抖音    |   CwB5EcEXOP.txt  |   e125efbb7cd91df5f35d3087122b80d5    |
| 秀脸微信小程序-100261(新) |   抖音    |  6mFY52dho1.txt   |   177aba66f2fd5619ad176d4bf1c0a272    |
| 会拍抖音小程序-100170(新) |   抖音    |  Ihasbs6rmj.txt   |   5f8af84fc451a224d990ce37cb33d4c3    |

**markdown转JSON脚本**
```js
// 将markdown格式转换为json格式
const fs = require('fs');

// 读取Markdown文件并解析表格数据
function parseMarkdownToJSON(markdownFile) {
    const markdownContent = fs.readFileSync(markdownFile, 'utf8');
    const lines = markdownContent.split('\n');
    const headers = lines[0].trim().split('|').map(item => item.trim());
    const header  = headers.splice(1,4);
    const data = [];
  
    for (let i = 2; i < lines.length; i++) {
      const valuesA = lines[i].trim().split('|').map(item => item.trim());
      const values = valuesA.splice(1,4);
      if (values.length === header.length) {
        const row = {};
        for (let j = 0; j < header.length; j++) {
          row[header[j]] = values[j];
        }
        data.push(row);
      }
    }
  
    return data;
  }

// 将JSON数据保存到文件
function saveJSONToFile(data, jsonFile) {
  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
}

const markdownFile = 'domain.md';
const jsonFile = 'output.json';

const jsonData = parseMarkdownToJSON(markdownFile);
saveJSONToFile(jsonData, jsonFile);

console.log(`Markdown数据已成功转换为JSON并保存到${jsonFile}`);

```