import { ReactElement, useState } from 'react';

export type PermissionMap = Record<string, { id: string; label: string; declineMessage: string }>;

export type PermissionRequest = Record<string, { declineMessage: string }>;

interface RenderProps {
  permitted: PermissionMap;
}

interface HookProps {
  permissions: PermissionRequest;
  onDenied: () => void;
}

interface Props extends HookProps {
  render: (props: RenderProps) => ReactElement;
}

function usePermissionManager({ permissions, onDenied }: HookProps): RenderProps {
  const [permitted, setPermitted] = useState<PermissionMap | null>(null);

  const findPermissions = () => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const ret: PermissionMap = {};
      const kinds = Object.keys(permissions);
      devices.forEach(device => {
        if (kinds.includes(device.kind)) {
          ret[device.kind] = {
            id: device.deviceId,
            label: device.label,
            declineMessage: permissions[device.kind].declineMessage,
          };
          if (!device.label) {
            onDenied();
          }
        }
      });
      setPermitted(ret);
      return;
    });
  };

  if (!permitted) {
    findPermissions();
  }

  return {
    permitted: permitted ?? {},
  };
}

const PermissionManager = (props: Props) => props.render(usePermissionManager(props));

export default PermissionManager;
