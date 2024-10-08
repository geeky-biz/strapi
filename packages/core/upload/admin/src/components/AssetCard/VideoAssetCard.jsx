import React, { useState } from 'react';

import { Box, CardAsset, CardTimer } from '@strapi/design-system';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

import { formatDuration } from '../../utils';

import { AssetCardBase } from './AssetCardBase';
import { VideoPreview } from './VideoPreview';

const VideoPreviewWrapper = styled(Box)`
  canvas,
  video {
    display: block;
    pointer-events: none;
    max-width: 100%;
    max-height: ${({ size }) => (size === 'M' ? 16.4 : 8.8)}rem;
  }
`;

export const VideoAssetCard = ({ name, url, mime, size, ...props }) => {
  const [duration, setDuration] = useState();

  const formattedDuration = duration && formatDuration(duration);

  return (
    <AssetCardBase name={name} {...props} variant="Video">
      <CardAsset size={size}>
        <VideoPreviewWrapper size={size}>
          <VideoPreview url={url} mime={mime} onLoadDuration={setDuration} alt={name} />
        </VideoPreviewWrapper>
      </CardAsset>
      <CardTimer>{formattedDuration || '...'}</CardTimer>
    </AssetCardBase>
  );
};

VideoAssetCard.defaultProps = {
  onSelect: undefined,
  onEdit: undefined,
  onRemove: undefined,
  selected: false,
  size: 'M',
};

VideoAssetCard.propTypes = {
  extension: PropTypes.string.isRequired,
  mime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  url: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M']),
};
