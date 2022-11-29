import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import CurrentTheme from '../../../styles/index';

const Loader: React.FC = () => {
    const currentTheme = CurrentTheme();

    return (
        <div className='flex justify-center'>
            <Spin
                size={'large'}
                indicator={
                    <LoadingOutlined
                        className={`text-[${currentTheme.text}]`}
                        spin
                    />
                }
            />
        </div>
    );
}

export default Loader;
