import React from 'react';

import { Tag } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const FilterTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime } = useIntl();

  const handleClick = () => {
    onClick(filter);
  };

  const { fieldSchema } = attribute;

  const type = fieldSchema.type;

  let formattedValue = value;

  if (type === 'date') {
    formattedValue = formatDate(value, { dateStyle: 'full' });
  }

  if (type === 'datetime') {
    formattedValue = formatDate(value, { dateStyle: 'full', timeStyle: 'short' });
  }

  if (type === 'time') {
    const [hour, minute] = value.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    formattedValue = formatTime(date, {
      numeric: 'auto',
      style: 'short',
    });
  }

  const content = `${attribute.metadatas.label} ${formatMessage({
    id: `components.FilterOptions.FILTER_TYPES.${operator}`,
    defaultMessage: operator,
  })} ${formattedValue}`;

  return (
    <Tag onClick={handleClick} icon={<Cross />} padding={1}>
      {content}
    </Tag>
  );
};

FilterTag.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fieldSchema: PropTypes.object.isRequired,
    metadatas: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  filter: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterTag;
