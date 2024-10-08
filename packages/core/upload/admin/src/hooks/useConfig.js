import { useTracking, useNotification, useFetchClient } from '@strapi/admin/strapi-admin';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from 'react-query';

import pluginId from '../pluginId';

const endpoint = `/${pluginId}/configuration`;
const queryKey = [pluginId, 'configuration'];

export const useConfig = () => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { get, put } = useFetchClient();

  const config = useQuery(
    queryKey,
    async () => {
      const res = await get(endpoint);

      return res.data.data;
    },
    {
      onError() {
        return toggleNotification({
          type: 'danger',
          message: formatMessage({ id: 'notification.error' }),
        });
      },
      /**
       * We're cementing that we always expect an object to be returned.
       */
      select: (data) => (!data ? {} : data),
    }
  );

  const putMutation = useMutation(
    async (body) => {
      await put(endpoint, body);
    },
    {
      onSuccess() {
        trackUsage('didEditMediaLibraryConfig');
        config.refetch();
      },
      onError() {
        return toggleNotification({
          type: 'danger',
          message: formatMessage({ id: 'notification.error' }),
        });
      },
    }
  );

  return {
    config,
    mutateConfig: putMutation,
  };
};
