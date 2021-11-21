import { ReactElement, useState } from 'react';

export type PermissionMap = Map<string, { id: string; label: string; declineMessage?: string }>;

export type PermissionRequest = Map<string, { declineMessage: string }>;

interface RenderProps {
  permissions: PermissionMap;
}

interface HookProps {
  requests: PermissionRequest;
  onDenied: () => void;
}

interface Props extends HookProps {
  render: (props: RenderProps) => ReactElement;
}

function usePermissionManager({ requests, onDenied }: HookProps): RenderProps {
  const [permissions, setPermissions] = useState<PermissionMap>(new Map());

  const findPermissions = () => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const ret: PermissionMap = new Map();
      devices.forEach(device => {
        if (requests.has(device.kind)) {
          if (!device.label) {
            ret.set(device.kind, {
              id: device.deviceId,
              label: device.label,
              declineMessage: requests.get(device.kind)?.declineMessage,
            });
          } else {
            onDenied();
          }
        }
      });
      setPermissions(ret);
      return;
    });
  };

  if (permissions.size === 0) {
    findPermissions();
  }

  return {
    permissions,
  };
}

const PermissionManager = (props: Props) => props.render(usePermissionManager(props));

export default PermissionManager;
