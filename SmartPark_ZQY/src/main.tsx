import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "./mock"
import { Provider } from 'react-redux';
import { store } from './store';
import {ConfigProvider} from "antd"
import zhCN from 'antd/locale/zh_CN';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </Provider>
);