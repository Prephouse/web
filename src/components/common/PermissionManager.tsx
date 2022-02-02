import { ReactElement, useEffect, useState } from 'react';

export type PermissionRequestMap = Map<string, { declineMessage: string }>;
export type PermissionAccessMap = Map<
  string,
  { id: string; label: string; declineMessage?: string }
>;

interface RenderProps {
  permissions: PermissionAccessMap;
}

interface HookProps {
  requests: PermissionRequestMap;
  onDenied: () => void;
}

interface Props extends HookProps {
  render: (props: RenderProps) => ReactElement | null;
}

function usePermissionManager({ requests, onDenied }: HookProps): RenderProps {
  const [permissions, setPermissions] = useState<PermissionAccessMap>(new Map());

  useEffect(() => {
    let isSubscribed = true;

    if (permissions.size === 0) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        if (isSubscribed) {
          const ret: PermissionAccessMap = new Map();
          devices.forEach(device => {
            if (requests.has(device.kind)) {
              if (!device.label) {
                ret.set(device.kind, {
                  id: `${device.deviceId}/${device.groupId}`,
                  label: device.label,
                  declineMessage: requests.get(device.kind)?.declineMessage,
                });
              } else {
                onDenied();
              }
            }
          });
          setPermissions(ret);
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [onDenied, permissions.size, requests]);

  return {
    permissions,
  };
}

const PermissionManager = (props: Props) => props.render(usePermissionManager(props));

export default PermissionManager;
