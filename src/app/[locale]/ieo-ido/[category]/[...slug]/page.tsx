import { TopIdoLaunchPadDetail } from '@/usecases/ieo-ido';
import LaunchPadInfomation from './LaunchPadInfomation';
import { AxiosError } from 'axios';
import { LaunchPadInfomationType } from '../types';
import { IResponseAxios } from '@/models/IResponse';

type PropsType = {
  params: {
    slug: string[];
    category: string;
  };
};

const DetailPage = async ({ params }: PropsType) => {
  try {
    //@ts-ignore
    const data: LaunchPadInfomationType = await TopIdoLaunchPadDetail(
      params.slug[0]
    );

    return <LaunchPadInfomation category={params.category} data={data} />;
  } catch (error) {
    return <h1>Internal Server Error</h1>;
  }
};

export default DetailPage;
