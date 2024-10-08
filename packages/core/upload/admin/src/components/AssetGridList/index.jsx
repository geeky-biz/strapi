import React from 'react';

import { Box, Grid, KeyboardNavigable, Typography } from '@strapi/design-system';
import PropTypes from 'prop-types';

import { AssetCard } from '../AssetCard/AssetCard';

import { Draggable } from './Draggable';

export const AssetGridList = ({
  allowedTypes,
  assets,
  onEditAsset,
  onSelectAsset,
  selectedAssets,
  size,
  onReorderAsset,
  title,
}) => {
  return (
    <KeyboardNavigable tagName="article">
      {title && (
        <Box paddingTop={2} paddingBottom={2}>
          <Typography tag="h2" variant="delta" fontWeight="semiBold">
            {title}
          </Typography>
        </Box>
      )}

      <Grid.Root gap={4}>
        {assets.map((asset, index) => {
          const isSelected = !!selectedAssets.find((currentAsset) => currentAsset.id === asset.id);

          if (onReorderAsset) {
            return (
              <Grid.Item key={asset.id} col={3} height="100%">
                <Draggable index={index} moveItem={onReorderAsset} id={asset.id}>
                  <AssetCard
                    allowedTypes={allowedTypes}
                    asset={asset}
                    isSelected={isSelected}
                    onEdit={onEditAsset ? () => onEditAsset(asset) : undefined}
                    onSelect={() => onSelectAsset(asset)}
                    size={size}
                  />
                </Draggable>
              </Grid.Item>
            );
          }

          return (
            <Grid.Item col={3} key={asset.id} height="100%" direction="column" alignItems="stretch">
              <AssetCard
                key={asset.id}
                allowedTypes={allowedTypes}
                asset={asset}
                isSelected={isSelected}
                onEdit={onEditAsset ? () => onEditAsset(asset) : undefined}
                onSelect={() => onSelectAsset(asset)}
                size={size}
              />
            </Grid.Item>
          );
        })}
      </Grid.Root>
    </KeyboardNavigable>
  );
};

AssetGridList.defaultProps = {
  allowedTypes: ['images', 'files', 'videos', 'audios'],
  onEditAsset: undefined,
  size: 'M',
  onReorderAsset: undefined,
  title: null,
};

AssetGridList.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  assets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEditAsset: PropTypes.func,
  onSelectAsset: PropTypes.func.isRequired,
  selectedAssets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  size: PropTypes.oneOf(['S', 'M']),
  onReorderAsset: PropTypes.func,
  title: PropTypes.string,
};
