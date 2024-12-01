/**
 * 设置某些可选属性为必需
 */
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [K in Key]-?: Type[K];
};
