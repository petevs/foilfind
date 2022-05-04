import React from 'react';
import { Container, Grid, Image, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 400;

export function ImageGrid({images}) {


    console.log(images)

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
        <Image src={images[0]} height={PRIMARY_COL_HEIGHT} radius="md" />
        <Grid gutter="md">
          <Grid.Col span={6}>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <Image src={images[1]} height={SECONDARY_COL_HEIGHT} radius="md" />
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <Image src={images[2]} height={SECONDARY_COL_HEIGHT} radius="md" />
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <Image src={images[3]} height={SECONDARY_COL_HEIGHT} radius="md" />
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <Image src={images[4]} height={SECONDARY_COL_HEIGHT} radius="md" />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
  );
}