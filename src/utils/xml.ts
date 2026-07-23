import { FormState } from '../types';

const escapeXml = (unsafe: string) => {
    if (typeof unsafe !== 'string') return unsafe;
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export const exportToXml = (data: FormState) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<TwoPager>\n`;
  for (const [key, value] of Object.entries(data)) {
    if (key === 'team') {
       xml += `  <team>\n`;
       for (const member of data.team) {
           xml += `    <member>\n`;
           for (const [mKey, mValue] of Object.entries(member)) {
               xml += `      <${mKey}>${escapeXml(mValue)}</${mKey}>\n`;
           }
           xml += `    </member>\n`;
       }
       xml += `  </team>\n`;
    } else if (key === 'keyLinks') {
       xml += `  <keyLinks>\n`;
       for (const link of data.keyLinks) {
           xml += `    <link>\n`;
           for (const [lKey, lValue] of Object.entries(link)) {
               xml += `      <${lKey}>${escapeXml(lValue)}</${lKey}>\n`;
           }
           xml += `    </link>\n`;
       }
       xml += `  </keyLinks>\n`;
    } else if (key === 'images') {
       xml += `  <images>\n`;
       for (const image of data.images) {
           xml += `    <image>${escapeXml(image)}</image>\n`;
       }
       xml += `  </images>\n`;
    } else {
       xml += `  <${key}>${escapeXml(String(value))}</${key}>\n`;
    }
  }
  xml += `</TwoPager>`;
  return xml;
};

export const importFromXml = (xmlString: string, currentState: FormState): FormState => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
     throw new Error("Invalid XML");
  }

  const root = xmlDoc.getElementsByTagName('TwoPager')[0];
  if (!root) throw new Error("Missing TwoPager root element");

  const newState: any = { ...currentState };
  
  Array.from(root.children).forEach(child => {
    const key = child.tagName;
    
    if (key === 'team') {
      const team: any[] = [];
      Array.from(child.children).forEach(memberNode => {
        const member: any = {};
        Array.from(memberNode.children).forEach(mProp => {
          member[mProp.tagName] = mProp.textContent || "";
        });
        team.push(member);
      });
      newState[key] = team;
    } else if (key === 'keyLinks') {
      const links: any[] = [];
      Array.from(child.children).forEach(linkNode => {
        const link: any = {};
        Array.from(linkNode.children).forEach(lProp => {
          link[lProp.tagName] = lProp.textContent || "";
        });
        links.push(link);
      });
      newState[key] = links;
    } else if (key === 'images') {
      const images: string[] = [];
      Array.from(child.children).forEach(imgNode => {
        images.push(imgNode.textContent || "");
      });
      newState[key] = images;
    } else {
       const val = child.textContent || "";
       if (val === 'true') newState[key] = true;
       else if (val === 'false') newState[key] = false;
       else newState[key] = val;
    }
  });

  return newState as FormState;
};
