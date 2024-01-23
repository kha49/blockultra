import { IconDiscord, IconTelegram, IconTwitter } from '@/assets/icons';
import IconWeb from '@/assets/icons/IconWeb';
import { Popover, Select } from 'antd';
import Image from 'next/image';

 export function getLogo(type: string) {
   switch (type) {
     case 'explorer':
       return <IconWeb />;
     case 'twitter':
       return <IconTwitter />;
     case 'web':
       return <IconWeb />;
     case 'announcement':
       return <IconTelegram />;
     case 'telegram':
       return <IconTelegram />;
     case 'discord':
       return <IconDiscord />;
     case 'whitepaper':
       return <IconWeb />;
     default: return <IconWeb/>
   }
 }

const Links = (props: any) => {
  const links = props.links;
  console.log('====================================');
  console.log("links", links);
  console.log('====================================');
  if (!links) return;
  if (links?.length <= 0) return;
  let backerExtend = [];
  for (let i = 0; i < links.length; i++) {
    if (i > 2) {
      backerExtend.push(links[i]);
    }
  }
 
  return (
    <div>
      {links[0] && (
        <div>
          <p className='text-grey-500 text-sm'>Links</p>
          <div className='flex gap-4 xl:gap-5 py-[6px]'>
            {links[0] && getLogo(links[0].type)}
            {links[1] && getLogo(links[1].type)}
            {links[2] && getLogo(links[2].type)}
            <Popover content={<DialogLinks links={backerExtend} />}>
              <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                +{links.length - 3}
              </span>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};
export function DialogLinks(props: any) {
  const links = props.links;
  
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(links?.length).keys()).map((item: any) => {
        return getLogo(links[item].type);
      })}
    </div>
  );
}

export default Links;
