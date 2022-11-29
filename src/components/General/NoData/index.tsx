import { Empty } from 'antd';
import CurrentTheme from '../../../styles/index';

const NoData: React.FC = () => {
    const currentTheme = CurrentTheme();

    const style = {
        color: currentTheme.title
    }

    return (
        <div className='grid place-items-center h-[500px]'>
            <Empty style={style} />
        </div>
    );
}

export default NoData;
