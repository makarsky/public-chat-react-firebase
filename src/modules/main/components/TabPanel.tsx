import React from 'react';
import { Box } from '@material-ui/core';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return <>{value === index && <Box>{children}</Box>}</>;
};

export default TabPanel;
