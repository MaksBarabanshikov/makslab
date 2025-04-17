import { FC, PropsWithChildren } from 'react';
import { HEADER_HEIGHT_SIZE } from '../config/header-size';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div style={{ paddingTop: HEADER_HEIGHT_SIZE }}>{children}</div>;
};
