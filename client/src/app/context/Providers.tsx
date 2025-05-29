import React, { memo } from "react";

type TProps = {
  register: [
    {
      provider: React.ComponentType<any>;
      props: Record<string, any>;
    },
  ];
  children: React.ReactNode;
};

const Providers = (props: TProps) => {
  const { children, register } = props;

  return <>{register}</>;
};

export default memo(Providers);
