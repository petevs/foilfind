import React from 'react';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { Search, ArrowRight, ArrowLeft } from 'tabler-icons-react';

export function SearchInput(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<Search size={18} />}
      radius="md"
      size="md"
      placeholder="Products, retailers, brands, and more"
      {...props}
    />
  );
}