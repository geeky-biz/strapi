import React from 'react';

import { Box, CardAsset } from '@strapi/design-system';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

import { AssetCardBase } from './AssetCardBase';
import { AudioPreview } from './AudioPreview';

const AudioPreviewWrapper = styled(Box)`
  canvas,
  audio {
    display: block;
    max-width: 100%;
    max-height: ${({ size }) => (size === 'M' ? 16.4 : 8.8)}rem;
  }
`;

export const AudioAssetCard = ({ name, url, size, ...restProps }) => {
  return (
    <AssetCardBase name={name} {...restProps} variant="Audio">
      <CardAsset size={size}>
        <AudioPreviewWrapper size={size}>
          <AudioPreview url={url} alt={name} />
        </AudioPreviewWrapper>
      </CardAsset>
    </AssetCardBase>
  );
};

AudioAssetCard.defaultProps = {
  onSelect: undefined,
  onEdit: undefined,
  onRemove: undefined,
  selected: false,
  size: 'M',
};

AudioAssetCard.propTypes = {
  extension: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  url: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M']),
};
