export type TagT = {
  tag: string;
};

export type EmitT<Value> = {
  emit: () => Value;
};
